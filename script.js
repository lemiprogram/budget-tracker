
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
  //table
  const transactionTable = document.querySelector(".section-table table tBody")
  const tableBalance = document.querySelector(".section-table table tFoot .balance-val")
  const tableTotalIncome = document.querySelector(".section-table table tFoot .total-income-val")
  const tableTotalExpense = document.querySelector(".section-table table tFoot .total-expense-val")
  //arrays
  let transactions = [];

  //values
  let balance = localStorage.getItem("balance")?Number(localStorage.getItem("balance")):0;

//functions

//renderPage = renders the page to the original set state
function renderPage(){
  
  transactionTable.innerHTML = transactions.map(transaction => `
        <tr>
            <td>${transaction.date.toDateString().slice(4)}</td>
            <td>${transaction.title}</td>
            <td class="expense-value">${transaction.type === "expense"? transaction.amount:"-"}</td>
            <td class="income-value">${transaction.type === "income"? transaction.amount:"-"}</td>
        </tr>
    `
  ).join("")
  calcBalance(transactions);
  console.log(balance)
  
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
    balance = 0
    for(let obj of arr){
      if(obj.type === "income"){
        balance += Number(obj.amount)
        continue
      }
      balance -= Number(obj.amount)
    }
  }
  function showWindow(element){
    window.onclick = event=>{
      if(event.target === element){
          closeElement(element)
      }
    }
  }
  function closeElement(element){
    element.style.display = "none"
  }
//add event listeners
  //when a nav item is clicked it would evoke thechangeFocusNav function on the item clicked
  navItems.forEach(item=>item.addEventListener("click",e=>changeFocusNav(e.target)))
  // when the logo is clicked it would evoke the changeFocusNav function on the homeNav
  logo.addEventListener("click",()=>changeFocusNav(homeNav))
  //when the add button is clicked it would add a transaction to the treansactions array 
  addTransactionBtn.addEventListener("click", addTransaction)
  //
renderPage()
changeFocusNav(homeNav)
showWindow(document.querySelector(".table-inps"))