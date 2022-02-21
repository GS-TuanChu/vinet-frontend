async function getETHBalance (accountAddress, val) {
  let balance = await web3.eth.getBalance(accountAddress)
  if (!val) {
    if (isMainAccount) {
      amount.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
      VANbalanceETH.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
    }
  } else {
    if (val == searchOptions.usdc) {
      searchAccountETH.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
    }
    else if (val == searchOptions.van) {
      VANsearchAccountETH.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
    }
  }
}

async function getUSDCBalance (accountAddress, val) {
  let balance = await contractUSDC.methods.balanceOf(accountAddress).call()
  if (!val) {
    if (isMainAccount) {
      balanceUSDC.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
      VANbalanceUSDC.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
    }
    else {
      searchAccountUSDC.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
    }
  }
  else {
    if (val == searchOptions.usdc) {
      searchAccountUSDC.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
    }
    else if (val == searchOptions.van) {
      VANsearchAccountUSDC.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
    }
  }

}

async function getVUSDBalance (accountAddress, val) {
  let balance = await contractVUSD.methods.balanceOf(accountAddress).call()
  if (!val) {
    if (isMainAccount) {
      balanceVUSD.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
      VANbalanceVUSD.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
    }
    else {
      searchAccountVUSD.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
    }
  }
  else {
    if (val == searchOptions.usdc) {
      searchAccountVUSD.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
    }
    else if (val == searchOptions.van) {
      VANsearchAccountVUSD.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
    }
  }

}

async function getVANBalance (accountAddress, val) {
  let balance = await contractVAN.methods.balanceOf(accountAddress).call()
  if (!val) {
    if (isMainAccount)
      VANbalanceVAN.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
    else
      VANsearchAccountVAN.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
  }
  else {
    VANsearchAccountVAN.innerHTML = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4)
  }

}

async function getBalance (accountAddress) {
  await getETHBalance(accountAddress)
  await getUSDCBalance(accountAddress)
  await getVANBalance(accountAddress)
  await getVUSDBalance(accountAddress)
}
// convert decimal to wei
function convertTokenValue (number, decimal) {
  let wei = ""
  for (let i = 0; i < decimal; i++) {
    wei = wei + "0"
  }
  return number + wei
}

function isOwner (currentAccount) {
  currentAccount = parseInt(parseInt(currentAccount, 16))
  currentOwner = parseInt(parseInt(currentOwner, 16))
  return (currentAccount) == (currentOwner)
}