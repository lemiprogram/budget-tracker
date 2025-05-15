
//variables
  //header heading
  const logo = document.querySelector("header .heading")
  // nav items
  const navItems = document.querySelectorAll(".nav-item");
  const [homeNav, tableNav, spreadSheetNav, filterNav]  = navItems
  // sections
  const sections = document.querySelectorAll(".section")
  const [homeSection,tableSection,spreadSheetSection,filterSection] = sections
  //btns
  const addTransactionBtn = document.querySelector("#add-transaction")
  const showTransactionInpsBtn = document.querySelector(".show-transactionInps-btn")
  //table
  const tableInps = document.querySelector(".table-inps")
  const table = document.querySelector(".table")
  const transactionTable = document.querySelector(".section-table table tBody")
  const tableBalance = document.querySelector(".section-table table tFoot .balance-val")
  const tableTotalIncome = document.querySelector(".section-table table tFoot .total-income-val")
  const tableTotalExpense = document.querySelector(".section-table table tFoot .total-expense-val")
  //arrays
  let transactions = [];

  //values

//functions

//renderPage = renders the page to the original set state
function renderPage(){
  let balance = calcBalance(transactions)
  let totalExpense = calcExpense(transactions)
  let totalIncome = calcIncome(transactions)
  //home section
  
  // table section
  transactionTable.innerHTML = transactions.map(transaction => `
        <tr>
            <td>${transaction.date.toDateString().slice(4)}</td>
            <td>${transaction.title}</td>
            <td class="expense-value">${transaction.type === "expense"? transaction.amount:"-"}</td>
            <td class="income-value">${transaction.type === "income"? transaction.amount:"-"}</td>
        </tr>
    `
  ).join("")
  tableBalance.innerHTML = balance?balance:"-"
  tableTotalExpense.innerHTML = totalExpense?totalExpense:"-"
  tableTotalIncome.innerHTML = totalIncome?totalIncome:"-"


  
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
    const type = document.querySelector(".inp select")
    transactions.push({
      date:new Date(),
      title:title.value,
      amount:Number(amount.value),
      type:type.value,
    });
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
//add event listeners
  //when a nav item is clicked it would evoke thechangeFocusNav function on the item clicked
  navItems.forEach(item=>item.addEventListener("click",e=>changeFocusNav(e.target)))
  // when the logo is clicked it would evoke the changeFocusNav function on the homeNav
  logo.addEventListener("click",()=>changeFocusNav(homeNav))
  //when the add button is clicked it would add a transaction to the treansactions array 
  addTransactionBtn.addEventListener("click", addTransaction)
  //brings up the table-inps
  showTransactionInpsBtn.addEventListener("click", ()=>{
    renderPage()
    tableInps.classList.remove("hidden")
  })
renderPage()
changeFocusNav(homeNav)
showWindow(document.querySelector(".table-inps"))