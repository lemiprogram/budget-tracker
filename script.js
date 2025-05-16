
//variables
  //header heading
  const logo = document.querySelector("header .heading")
  // nav items
  const navItems = document.querySelectorAll(".nav-item");
  const [tableNav,filterNav]  = navItems
  // sections
  const sections = document.querySelectorAll(".section")
  const [tableSection, filterSection] = sections
  // inputs
  const filterCheckBoxes = document.querySelectorAll(".filter-type label input")
  const [showIncome,showExpense] = filterCheckBoxes
  //btns
  const addTransactionBtn = document.querySelector("#add-transaction")
  const filterTransactionBtn = document.querySelector("#filter-transaction")
  //table
  const tableInps = document.querySelector(".table-inps")
  const table = document.querySelector(".table")
  const transactionTable = document.querySelector(".section-table table tBody")
  const tableBalance = document.querySelector(".section-table table tFoot .balance-val")
  const tableTotalIncome = document.querySelector(".section-table table tFoot .total-income-val")
  const tableTotalExpense = document.querySelector(".section-table table tFoot .total-expense-val")
  //arrays
  !localStorage.getItem("transactions")?localStorage.setItem("transactions",JSON.stringify([])):console.log(JSON.parse(localStorage.getItem("transactions")))
  let transactions = JSON.parse(localStorage.getItem("transactions"))

  //values

  //functions
  
  //renderPage = renders the page to the original set state
  function renderPage(){
  let balance = calcBalance(transactions)
  let totalExpense = calcExpense(transactions)
  let totalIncome = calcIncome(transactions)
  renderFilters()

  // table section
  transactionTable.innerHTML = transactions.map(transaction => `
        <tr>
            <td>${getTimeDif(new Date(transaction.date))}</td>
            <td>${transaction.title}</td>
            <td class="expense-value">${transaction.type === "expense"? transaction.amount:"-"}</td>
            <td class="income-value">${transaction.type === "income"? transaction.amount:"-"}</td>
        </tr>
    `
  ).join("")
  tableBalance.innerHTML = balance
  tableTotalExpense.innerHTML = totalExpense
  tableTotalIncome.innerHTML = totalIncome


}
// changeFocusNav = adds the focus-nav class to the nav-link selected
function changeFocusNav (e) {
  for(let nav of e.parentNode.querySelectorAll("li")){
    if(nav  === e){
      nav.classList.add("focus-nav")
        continue
      }
      nav.classList.remove("focus-nav")
    }
    changeSection(e.id)
  }
  // changeSection = add the hidden class to the nav-links not selected
  function changeSection(id){
    e = document.querySelector(`#section-${id}`)
    for(let section of e.parentNode.querySelectorAll(".section")){
      if(section === e){
        section.classList.remove("hidden")
        continue;
      }
      section.classList.add("hidden")
    }
    
  }
  //addTransaction = adds a transaction to the trasactions array
  function addTransaction(){

    const[title,amount] = document.querySelectorAll(".inp input")
    if(title.value.trim() === ""){
      return alert("please input a Transaction name")
    }
    if(Number.isNaN(Number(amount.value))||!amount.value.trim(  )){
      return alert("please input a number")
    }
    const type = document.querySelector(".inp select")
    transactions.push({
      date:new Date(),
      title:title.value,
      amount:Number(amount.value),
      type:type.value,
    });
    title.value=""; amount.value = "";
    localStorage.setItem("transactions",JSON.stringify(transactions))
    renderPage();
  } 
  //calcBalance = calculates the balance after the page is rendered
  function calcBalance(arr){
    let balance = 0
    for(let obj of arr){
      if(obj.type === "income"){
        balance += Number(obj.amount)
        continue
      }
      balance -= Number(obj.amount)
    }
    return balance
  }
  //calcIncome = calculates the Income after the page is rendered
  function calcIncome(arr){
    let income = 0
    for(let obj of arr){
      if(obj.type === "income"){
        income += Number(obj.amount)
        continue
      }
    }
    return income
  }
  //calcExpense = calculates the Expense after the page is rendered
  function calcExpense(arr){
    let expense = 0
    for(let obj of arr){
      if(obj.type === "expense"){
        expense += Number(obj.amount)
        continue
      }
    }
    return expense
  }
  function getTimeDif(obj){
    let now = new Date()
    timeAgo = Math.ceil((now.getTime() - obj.getTime()) / 1000)
    if(timeAgo<60){
      return `${timeAgo} Secs Ago`
    }
    timeAgo = Math.ceil(timeAgo/60)
    
    if(timeAgo<60){
      return `${timeAgo} Mins Ago`
    }
    timeAgo = Math.ceil(timeAgo/60)
    
    if(timeAgo<24){
      return `${timeAgo} Hrs Ago`
    }
    timeAgo = Math.ceil(timeAgo/24)
    return `${timeAgo} Days Ago`
    
  }
  //showWindow = used to close a menu by clicking on any part of the window that is not that element
  function showWindow(element){
    window.onclick = event=>{
      if(event.target === element){
          closeElement(element)
          renderPage()
      }
    }
  }
  function closeElement(element){
    element.classList.add("hidden")
  }

  function filterOutIncome(arr){
    return arr.filter(item=>item.type !== "income")
  }
  function filterOutExpense(arr){
    return arr.filter(item=>item.type !== "expense")
  }
  function filterByAmount(arr,amount,sign,type){
    switch (sign){
      case "le":
        return arr.filter(item=>item.amount<=amount&&item.type==type)
        
      case "lt":
        return arr.filter(item=>item.amount<amount&&item.type==type)
        
      case "ge":
        return arr.filter(item=>item.amount>=amount&&item.type==type)
        
      case "gt":
        return arr.filter(item=>item.amount>amount&&item.type==type)
        
      default :
        return arr.filter(item=>item.amount==amount&&item.type==type)
        
    }

  }
  const renderFilters = ()=>{
      
    const table = document.querySelector("#section-filter table");
    const [incomeAmount, expenseAmount] = document.querySelectorAll("#section-filter .filter-by-amount input")
    const [incomeSign, expenseSign] = document.querySelectorAll("#section-filter .filter-by-amount select")
    table.classList.remove("hidden")
    let arr = transactions
    let checkedIncome = showIncome.checked
    let checkedExpense = showExpense.checked

    if (!checkedIncome) {
      arr = filterOutIncome(arr)
    }
    if (!checkedExpense) {
      arr = filterOutExpense(arr)
    }
    if(incomeAmount.value){
      arr = filterByAmount(arr,incomeAmount.value,incomeSign.value,"income")
    }
    if(expenseAmount.value){
      arr = filterByAmount(arr,expenseAmount.value,expenseSign.value,"expense")
    }
    if(arr.length){
      table.classList.remove("hidden")
      table.querySelector("thead tr").innerHTML = `
      <th>Date</th>
      <th>Transactions</th>
      ${checkedExpense?"<th>Expense</th>":""}
      ${checkedIncome?"<th>Income</th>":""}
    `
    table.querySelector("tBody").innerHTML = arr.map(item=>`
<tr>
  <td>${getTimeDif(new Date(item.date))}</td>
  <td>${item.title}</td>
  ${!checkedExpense?"":item.type !== "expense"?"<td>-</td>": "<td>"+item.amount+"</td>"}
  ${!checkedIncome?"":item.type !== "income"?"<td>-</td>": "<td>"+item.amount+"</td>"}
</tr>
      `).join("")
      table.querySelector("tFoot").innerHTML = `
<th colspan="2">Total</th>
${checkedExpense?"<td>"+calcExpense(arr)+"</td>": ""}
${checkedIncome?"<td>"+calcIncome(arr)+"</td>": ""}
      `
    }
    else{
      table.classList.add("hidden")
    }
  }
  console.log(filterOutExpense(transactions))
//add event listeners
  //when a nav item is clicked it would evoke thechangeFocusNav function on the item clicked
  navItems.forEach(item=>item.addEventListener("click",e=>changeFocusNav(e.target)))  
  //when the add button is clicked it would add a transaction to the treansactions array 
  addTransactionBtn.addEventListener("click", addTransaction)
  //when the filter button is clicked it would display transactions onto the table based on the filters chosen
  filterTransactionBtn.addEventListener("click", renderFilters)
renderPage()
changeFocusNav(tableNav)
showWindow(document.querySelector(".table-inps"))