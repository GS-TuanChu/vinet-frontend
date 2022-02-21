async function submit (val) {
  if (val == currency.usdc) {
    btnSubmit.disabled = true
    let amount = vusdAmount.value * 10 ** 12
    if (isNaN(amount)) {
      throw Error("Please enter a valid number")
    }
    const isApproved = await approveUSDC(amount)
    if (loginMetamask() && isApproved) {
      amount = convertTokenValue(amount, 6)
      if (opt == VUSD.buy) {
        await buyToken(val, amount)
      } else {
        await sellToken(val, amount)
      }
    }
    btnSubmit.disabled = false
    VANbtnSubmit.disabled = false
  } else if (val == currency.vnt) {
    VANbtnSubmit.disabled = true
    let amount = vanAmount.value
    if (isNaN(amount)) {
      throw Error("Please enter a valid number")
    }
    if (loginMetamask()) {
      if (opt == VUSD.buy) {
        const isApproved = await approveVAN(amount * 10 ** 12, VAN.buy)
        if (isApproved) {
          amount = convertTokenValue(amount * 10 ** 12, 6)
          await buyToken(val, amount)
        }
      } else {
        const isApproved = await approveVAN(amount, VAN.sell)
        if (isApproved) {
          amount = convertTokenValue(amount, 18)
          await sellToken(val, amount)
        }
      }
    }
    btnSubmit.disabled = false
    VANbtnSubmit.disabled = false
  }

}

// buyToken function
async function buyToken (val, amount) {
  try {
    if (val == currency.usdc) {
      await contractVUSD.methods.buyToken(amount).send({ from: currentAccount })
    }
    else if (val == currency.vnt) {
      await contractVAN.methods.buyToken(amount).send({ from: currentAccount })
    }
    await getBalance(currentAccount)

  } catch (error) {
    console.log(error)
  }
  btnSubmit.disabled = false
  VANbtnSubmit.disabled = false
}

// sellToken function
async function sellToken (val, amount) {
  try {
    if (val == currency.usdc) {
      await contractVUSD.methods.sellToken(amount).send({ from: currentAccount })
    }
    else if (val == currency.vnt) {
      await contractVAN.methods.sellToken(amount).send({ from: currentAccount })
    }
    await getBalance(currentAccount)

  } catch (error) {
    console.log(error)
  }
  btnSubmit.disabled = false
  VANbtnSubmit.disabled = false
}

async function mintUSDCHandler () {
  let amount = usdcAmount.value
  if (isNaN(amount)) {
    throw Error("Please enter a valid number")
  }
  amount = fromDecimalToWei(amount)
  await mintUSDC.methods.mintToken(amount).send({ from: currentAccount })
}

async function changeStatusHandler () {
  try {
    await contractVUSD.methods.changeStatus(!allowTransaction).send({ from: currentAccount })
    return
  } catch (error) {
    console.log(error)
  }
}