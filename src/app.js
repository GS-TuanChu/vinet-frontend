async function onLoad () {
  if (checkMetamask()) {
    installMM.style.display = "none"
    account.style.display = "block"
    btnStatus.style.display = "none"
    main.style.display = "none"
    let loggedInAccount = await loginMetamask()
    isMainAccount = true
    if (loggedInAccount) {
      if (isOwner(loggedInAccount)) {
        btnStatus.style.display = "block"
      } else {
        btnStatus.style.display = "none"
      }
      main.style.display = "block"
      loginMM.style.display = "none"
      currentAccount = loggedInAccount
      await getETHBalance(currentAccount)
      await getUSDCBalance(currentAccount)
      await getVUSDBalance(currentAccount)
      await getVANBalance(currentAccount)
    } else {
      loginMM.style.display = "block"
    }
    ethereum.on('accountsChanged', async (accounts) => {
      let loggedInAccount = accounts[0]
      isMainAccount = true
      if (isOwner(loggedInAccount)) {
        btnStatus.style.display = "block"
      } else {
        btnStatus.style.display = "none"
      }
      await getETHBalance(loggedInAccount)
      await getUSDCBalance(loggedInAccount)
      await getVUSDBalance(loggedInAccount)
      await getVANBalance(loggedInAccount)
    })
  } else {
    installMM.style.display = "block"
    main.style.display = "none"
    account.style.display = "none"
    loginMM.style.display = "none"
    btnStatus.style.display = "none"
  }
}

function checkMetamask () {
  if (typeof window.ethereum !== "undefined")
    return true
  return false
}

async function loginHandler () {
  try {
    currentAccount = await loginMetamask()
    if (currentAccount) {
      loginMM.style.display = "none"
      await contractVUSD.methods.changeStatus(true).send({ from: currentAccount })
      isMainAccount = true
      await getETHBalance(currentAccount)
      await getUSDCBalance(currentAccount)
      await getVUSDBalance(currentAccount)
      await getVANBalance(currentAccount)
    }
  } catch (error) {
    console.log(error)
  }
}

async function loginMetamask () {
  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" })
    if (accounts.length > 0)
      return accounts[0]
  } catch (error) {
    console.log(error)
  }
}

async function searchAccount (val) {
  isMainAccount = false

  if (val == searchOptions.usdc) {
    let account = searchBox.value
    if (!account)
      return alert("You need to enter a valid value")
    await getETHBalance(account, val)
    await getUSDCBalance(account, val)
    await getVUSDBalance(account, val)
  } else if (val == searchOptions.van) {
    let account = VANsearchBox.value
    if (!account)
      return alert("You need to enter a valid value")
    await getETHBalance(account, val)
    await getUSDCBalance(account, val)
    await getVUSDBalance(account, val)
    await getVANBalance(currentAccount, val)
  }

}

function selectHandler () {
  opt = option.value
  if (opt == VUSD.sell) {
    vusdAmount.placeholder = "How much VUSD do you want to sell?"
  } else {
    vusdAmount.placeholder = "How much VUSD do you want to buy?"
  }
}

function selectHandlerVAN () {
  opt = VANoption.value
  if (opt == VAN.sell) {
    VANinputAmount.placeholder = "Enter an amount of VAN you want to sell"
  } else {
    VANinputAmount.placeholder = "How much VUSD do you want to exchange for VAN?"
  }
}

async function approveUSDC (amount) {
  try {
    amount = convertTokenValue(amount, 6)
    return await contractUSDC.methods.approve(VUSDBlockchainAddress, amount).send({ from: currentAccount })
  } catch (error) {
    console.log(error)
  }
}

async function approveVAN (amount, opt) {
  try {
    if (opt == VAN.buy) {
      amount = convertTokenValue(amount, 6)
    } else if(opt == VAN.sell) {
      amount = convertTokenValue(amount, 18)
    }
    return await contractVUSD.methods.approve(VANBlockchainAddress, amount).send({ from: currentAccount })
  } catch (error) {
    console.log(error)
  }
}


async function check () {
  try {
    let balance = await contractVAN.methods.checkVUSDOfSender().call({ from: currentAccount })
    console.log(balance)
  } catch (error) {
    console.log("check", error)
  }
}

async function transfer () {
  try {
    await contractVAN.methods.transferFromSender(200).call({ from: currentAccount })
  } catch (error) {
    console.log('transfer error', error)
  }
}