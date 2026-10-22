const products = [
 {id:1,name:"Premium Cotton Fabric Rolls",category:"Textiles",price:"₹145–₹220",unit:"per metre",moq:"500 metres",supplier:"Aarav Textiles",location:"Surat, Gujarat",badge:"POPULAR",tag:"popular",image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80"},
 {id:2,name:"Industrial LED Panel Lights",category:"Electronics",price:"₹380–₹620",unit:"per unit",moq:"100 units",supplier:"Northstar Electrics",location:"Delhi, India",badge:"BULK VALUE",tag:"popular",image:"https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=700&q=80"},
 {id:3,name:"Eco Kraft Packaging Boxes",category:"Packaging",price:"₹8–₹18",unit:"per piece",moq:"2,000 pieces",supplier:"Packwell Industries",location:"Ahmedabad, Gujarat",badge:"NEW ARRIVAL",tag:"new",image:"https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=700&q=80"},
 {id:4,name:"Commercial Office Chairs",category:"Furniture",price:"₹2,200–₹3,800",unit:"per unit",moq:"25 units",supplier:"Forma Workspace",location:"Mumbai, Maharashtra",badge:"POPULAR",tag:"popular",image:"https://images.unsplash.com/photo-1505843490701-5be5d0b7c6b4?auto=format&fit=crop&w=700&q=80"},
 {id:5,name:"Stainless Steel Fasteners",category:"Machinery",price:"₹90–₹160",unit:"per kg",moq:"200 kg",supplier:"Precision Metals Co.",location:"Rajkot, Gujarat",badge:"NEW ARRIVAL",tag:"new",image:"https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=700&q=80"},
 {id:6,name:"Solar Panel Mounting Kits",category:"Electronics",price:"₹1,150–₹1,900",unit:"per kit",moq:"50 kits",supplier:"Helio Components",location:"Jaipur, Rajasthan",badge:"BULK VALUE",tag:"popular",image:"https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=700&q=80"},
 {id:7,name:"Organic Cotton Tote Bags",category:"Textiles",price:"₹42–₹75",unit:"per piece",moq:"300 pieces",supplier:"EarthForm Goods",location:"Bengaluru, Karnataka",badge:"NEW ARRIVAL",tag:"new",image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80"},
 {id:8,name:"Drip Irrigation Starter Kits",category:"Agriculture",price:"₹780–₹1,250",unit:"per kit",moq:"40 kits",supplier:"Greenfield Agri Supply",location:"Nashik, Maharashtra",badge:"POPULAR",tag:"popular",image:"https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=700&q=80"}
];
const productGrid = document.getElementById("productGrid");
const resultsNote = document.getElementById("resultsNote");
let currentFilter = "all";
let currentQuery = "";
let currentCategory = "all";
const saved = new Set();

function renderProducts() {
  const q = currentQuery.trim().toLowerCase();
  const filtered = products.filter(p => {
    const matchesQuery = !q || [p.name,p.category,p.supplier,p.location].some(v=>v.toLowerCase().includes(q));
    const matchesCategory = currentCategory === "all" || p.category.toLowerCase() === currentCategory.toLowerCase();
    const matchesTag = currentFilter === "all" || p.tag === currentFilter;
    return matchesQuery && matchesCategory && matchesTag;
  });
  resultsNote.textContent = (q || currentCategory !== "all") ? `${filtered.length} sample product${filtered.length===1?"":"s"} match your search.` : "Illustrative product listings — supplier details and prices are sample data.";
  productGrid.innerHTML = "";
  if (!filtered.length) {
    productGrid.innerHTML = `<div class="empty-state"><strong>No products found just yet.</strong>Try another search or choose a different category.</div>`;
    return;
  }
  filtered.forEach(p=>{
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `<div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=700&q=80'"><span class="product-badge">${p.badge}</span><button class="favorite-button ${saved.has(p.id)?"saved":""}" data-favorite="${p.id}" aria-label="${saved.has(p.id)?"Remove from":"Add to"} saved products">${saved.has(p.id)?"♥":"♡"}</button></div><div class="product-info"><div class="product-supplier"><span class="verified-dot">✓</span>${p.supplier} <span>· ${p.location.split(",")[0]}</span></div><h3>${p.name}</h3><div class="product-price">${p.price} <small>${p.unit}</small></div><div class="product-meta"><span>Min. order: ${p.moq}</span><span>${p.category}</span></div></div><div class="product-card-footer"><button class="inquire-button" data-inquire="${p.id}">Contact supplier <span>↗</span></button></div>`;
    productGrid.appendChild(card);
  });
}
renderProducts();

document.querySelectorAll(".product-tabs button").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".product-tabs button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");currentFilter=btn.dataset.filter;renderProducts();
}));
document.querySelectorAll("[data-category]").forEach(btn=>btn.addEventListener("click",()=>{
  currentCategory=btn.dataset.category;currentQuery="";document.getElementById("heroSearch").value="";document.getElementById("heroCategory").value=currentCategory;
  currentFilter="all";document.querySelectorAll(".product-tabs button").forEach(b=>b.classList.toggle("active",b.dataset.filter==="all"));renderProducts();document.getElementById("products").scrollIntoView({behavior:"smooth"});
}));
function doSearch(){
 currentQuery=document.getElementById("heroSearch").value;
 currentCategory=document.getElementById("heroCategory").value;
 currentFilter="all";document.querySelectorAll(".product-tabs button").forEach(b=>b.classList.toggle("active",b.dataset.filter==="all"));
 renderProducts();document.getElementById("products").scrollIntoView({behavior:"smooth"});
}
document.getElementById("searchButton").addEventListener("click",doSearch);
document.getElementById("heroSearch").addEventListener("keydown",e=>{if(e.key==="Enter")doSearch()});
document.querySelectorAll("[data-search]").forEach(btn=>btn.addEventListener("click",()=>{document.getElementById("heroSearch").value=btn.dataset.search;doSearch()}));
document.getElementById("viewAll").addEventListener("click",()=>{currentQuery="";currentCategory="all";currentFilter="all";document.getElementById("heroSearch").value="";document.getElementById("heroCategory").value="all";document.querySelectorAll(".product-tabs button").forEach(b=>b.classList.toggle("active",b.dataset.filter==="all"));renderProducts()});

const backdrop=document.getElementById("modalBackdrop"), modalTitle=document.getElementById("modalTitle"), modalDescription=document.getElementById("modalDescription"), modalFields=document.getElementById("modalFields"), modalForm=document.getElementById("modalForm");
const modalConfigs={
 join:{title:"Join Sarv Data.",description:"Create your business profile and start exploring the marketplace.",fields:[["Full name","name","text","Your name"],["Work email","email","email","you@company.com"],["I want to","role","select","",["Buy products","Sell products","Explore both"]],["Company name","company","text","Your business name"]],submit:"Create my account"},
 signin:{title:"Welcome back.",description:"Enter your details to continue to your workspace.",fields:[["Work email","email","email","you@company.com"],["Password","password","password","Enter your password"]],submit:"Sign in"},
 rfq:{title:"Tell suppliers what you need.",description:"Create a sample request for quotation. This demo will not send it to live suppliers.",fields:[["Product or material","product","text","e.g. 5,000 kraft boxes"],["Required quantity","quantity","text","e.g. 5,000 pieces"],["Delivery location","location","text","City, state"],["Requirements","details","textarea","Specifications, budget, delivery timeline"]],submit:"Preview my RFQ"},
 inquire:{title:"Contact supplier.",description:"Share your requirements with this sample supplier.",fields:[["Your work email","email","email","you@company.com"],["Quantity required","quantity","text","Enter quantity"],["Message","message","textarea","Tell the supplier what you need"]],submit:"Prepare inquiry"}
};
let activeModal="join";
function openModal(type, product){
 activeModal=type;const config=modalConfigs[type]||modalConfigs.join;
 modalTitle.textContent=config.title;modalDescription.textContent=config.description;
 modalFields.innerHTML="";
 if(product){const hint=document.createElement("p");hint.style.cssText="font-size:10px;color:#d08a48;font-weight:700;margin:12px 0 0";hint.textContent=`Sample listing: ${product.name} · ${product.supplier}`;modalFields.appendChild(hint)}
 config.fields.forEach(([label,name,inputType,placeholder,options])=>{
  const wrap=document.createElement("div");wrap.className="modal-field";
  const lab=document.createElement("label");lab.htmlFor="field-"+name;lab.textContent=label;wrap.appendChild(lab);
  let input;
  if(inputType==="select"){input=document.createElement("select");(options||[]).forEach(v=>{const o=document.createElement("option");o.textContent=v;o.value=v;input.appendChild(o)})}
  else if(inputType==="textarea"){input=document.createElement("textarea");input.placeholder=placeholder}
  else{input=document.createElement("input");input.type=inputType;input.placeholder=placeholder}
  input.id="field-"+name;input.name=name;input.required=true;wrap.appendChild(input);modalFields.appendChild(wrap);
 });
 modalForm.querySelector(".modal-submit").innerHTML=config.submit+' <span>↗</span>';
 backdrop.hidden=false;document.body.style.overflow="hidden";setTimeout(()=>modalFields.querySelector("input,select,textarea")?.focus(),50);
}
function closeModal(){backdrop.hidden=true;document.body.style.overflow=""}
document.querySelectorAll("[data-open]").forEach(btn=>btn.addEventListener("click",e=>{e.preventDefault();openModal(btn.dataset.open)}));
productGrid.addEventListener("click",e=>{
 const fav=e.target.closest("[data-favorite]");
 if(fav){const id=Number(fav.dataset.favorite);saved.has(id)?saved.delete(id):saved.add(id);renderProducts();showToast(saved.has(id)?"Added to saved products":"Removed from saved products");return}
 const inquiry=e.target.closest("[data-inquire]");
 if(inquiry){const p=products.find(p=>p.id===Number(inquiry.dataset.inquire));openModal("inquire",p)}
});
document.getElementById("modalClose").addEventListener("click",closeModal);
backdrop.addEventListener("click",e=>{if(e.target===backdrop)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!backdrop.hidden)closeModal()});
modalForm.addEventListener("submit",e=>{
 e.preventDefault();const data=Object.fromEntries(new FormData(modalForm).entries());
 closeModal();
 if(activeModal==="signin")showToast("Demo only: sign-in needs a configured backend.");
 else if(activeModal==="join")showToast("Thanks! Connect a backend to create real accounts.");
 else if(activeModal==="rfq")showToast("RFQ preview ready. Connect a backend to send it to suppliers.");
 else showToast("Inquiry prepared. Connect a backend to contact the supplier.");
 modalForm.reset();
});
let toastTimer;
function showToast(message){const toast=document.getElementById("toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),3200)}
document.getElementById("announcementClose").addEventListener("click",()=>document.querySelector(".announcement").remove());
document.getElementById("mobileMenu").addEventListener("click",()=>document.querySelector(".main-nav").classList.toggle("open"));
document.querySelectorAll(".main-nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".main-nav").classList.remove("open")));
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("newsletterMessage").textContent="Thanks — newsletter signup needs a connected email service.";e.target.reset()});
document.getElementById("year").textContent=new Date().getFullYear();
if("IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>observer.observe(el))}else{document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"))}
