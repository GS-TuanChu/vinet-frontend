const web3 = new Web3(window.ethereum)
const amount = document.querySelector(".balance-eth")
const otherAmount = document.querySelector(".other-balance-eth")
const loginMM = document.querySelector("#loginMM")
const installMM = document.querySelector("#installMM")
const searchBtn = document.querySelector("#btn_search")
const inputValue = document.querySelector("#txt_amount")
const searchBox = document.querySelector("#txt_search")
const accountInfo = document.querySelector(".account-info")
const otherAccountInfo = document.querySelector(".other-account-info")
const option = document.querySelector("#exchange-options")
const vusdAmount = document.querySelector("#vusd-amount")

const USDCAddress = "0x38558FB189f9fB0a6B455064477627Fdbe3d0f1c"
const blockchainAddress = "0x26a3c89cDe6709969a6199d845324FbA7998bff0"
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "buy",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "buyVUSD",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "changeowner",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "changeOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "changestatus",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "changeStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "changeWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "sell",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "sellVUSD",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "checkBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const VUSD = {
  buy: "buy",
  sell: "sell",
}

let opt = VUSD.buy



accountInfo.style.display = "none"
otherAccountInfo.style.display = "none"
let isMainAccount = true
const contractMM = new web3.eth.Contract(abi, blockchainAddress)
const contractUSDC = new web3.eth.Contract(abi, USDCAddress)


let currentAccount = null

async function approveUSDC (amount) {
  // let result = await contractUSDC.methods.approve(blockchainAddress, 3000000000).send({ from: currentAccount })
  // console.log(result)
  // return result
  let result = await contractUSDC.methods.approve(blockchainAddress, amount).send({from: currentAccount})
  console.log(result)
}

function onLoad () {
  if (checkMetamask()) {
    installMM.style.display = "none"
    ethereum.on('accountsChanged', (accounts) => {
      isMainAccount = true
      updateBalance(accounts[0])
    })
  } else {
    installMM.style.display = "block"
    loginMM.style.display = "none"
    console.log("Please install Metamask")
  }
}

/**
 * 
 * @returns {bool}
 */
function checkMetamask () {
  if (typeof window.ethereum !== "undefined")
    return true
  return false
}

/**
 * 
 * @returns {object}
 */
async function loginHandler () {
  try {
    isMainAccount = true
    currentAccount = await loginMetamask()
    if (currentAccount) {
      loginMM.style.display = "none"
      await contractMM.methods.changeStatus(true).send({ from: currentAccount })
      await checkUSDCBalance()
      updateBalance(currentAccount)
    }
  } catch (error) {
  }
}

/**
 * @returns {object | null}
 */
async function loginMetamask () {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" })
  if (accounts.length > 0)
    return accounts[0]
  return null
}

async function updateBalance (address) {
  getVUSD(address).then(data => {
    updateLayout(data)
  })
}

function updateLayout (balance) {
  if (!isMainAccount) {
    otherAccountInfo.style.display = "block"
    otherAmount.innerHTML = parseFloat(balance).toFixed(4)
  } else {
    otherAccountInfo.style.display = "none"
    accountInfo.style.display = "block"
    amount.innerHTML = parseFloat(balance).toFixed(4)
  }

}

async function getVUSD (address) {
  const balance = await web3.eth.getBalance(address)
  return web3.utils.fromWei(balance, "ether")
}

async function searchAccount () {
  isMainAccount = false
  let balance = await getBalanceOf(searchBox.value)
  otherAccountInfo.style.display = "block"
  console.log(balance)
  updateLayout(web3.utils.fromWei(balance, "ether"))
}

async function getBalanceOf (address) {
  return await contractMM.methods.balanceOf(address).call()
}

function selectHandler () {
  opt = option.value
}

async function checkUSDCBalance () {
  console.log("checking balance...")
  let usdcBalance = await contractMM.methods.checkUSDCBalance().call({ from: currentAccount })

  console.log(usdcBalance)
}
async function submit () {
  let amount = vusdAmount.value
  try {
    if (isNaN(amount)) {
      throw Error("Please enter a valid number")
    }
    if (opt == VUSD.buy) {
      if (loginMetamask()) {
        await approveUSDC(amount)
        await contractMM.methods.buyVUSD(amount).call()
      }
      console.log('done')
    } else {
      await contractMM.methods.sellVUSD(amount).call()
    }
  } catch (error) {
    console.log(error.message)
  }
}

