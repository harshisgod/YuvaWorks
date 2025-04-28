const btn = document.getElementById("pricebtn");
const pricebtn = document.getElementsByClassName("price-range");
const complexbtn = document.querySelector(".result-card span");
const pastprojects = document.querySelector(".days");
const marklow = document.getElementsByClassName("market-low");
const markavg = document.getElementsByClassName("market-average");
const markhi = document.getElementsByClassName("market-high");


const skillsel = document.getElementById("skill-category");
skillsel.addEventListener("change", ()=>{
  console.log(`Selected skill: ${skillsel.value}`);
});

const expsel = document.getElementById("experience-level");
expsel.addEventListener("change", ()=>{
  console.log(`Selected Experince level: ${expsel.value}`);
});

const compsel = document.getElementById("project-complexity");
compsel.addEventListener("change", ()=>{
  console.log(`Selected Complexity level: ${compsel.value}`);
});

const dursel = document.getElementById("project-duration");
dursel.addEventListener("change", ()=>{
  console.log(`Selected Duration : ${dursel.value}`);
});


const skillCategory = [
  "Web Development", "Mobile Development", "Content Writing", "Graphic Design",
  "Digital Marketing", "Data Science", "Video Production", "Audio Services",
  "Cybersecurity"
];

const experienceLevel = [
  "Entry (0-2 years)", "Intermediate (2-5 years)",
  "Expert (5-10 years)", "Specialist (10+ years)"
];

const projectComplexity = ["basic", "intermediate", "complex", "expert"];

const projectDuration = [
  "less-week", "1-2 weeks", "2-4 weeks", "1-3 months", "3+ months"
];

const pricing = [];

function fetchPrice(skill, experience, complexity, duration) {
  const basePrice = {
    "basic": 100,
    "intermediate": 300,
    "complex": 600,
    "expert": 1000
  };

  const experienceMultiplier = {
    "entry": 1.0,
    "intermediate": 1.3,
    "expert": 1.7,
    "specialist": 2.2
  };

  const durationMultiplier = {
    "less-week": 0.8,
    "1-2-weeks": 1.0,
    "2-4-weeks": 1.3,
    "1-3-months": 1.6,
    "3-plus-months": 2.0
  };

  const skillBonus = {
    "web-development": 1.0,
    "mobile-development": 1.0,
    "content-writing": 0.9,
    "graphic-design": 1.0,
    "digital-marketing": 1.1,
    "data-science": 1.2,
    "video-production": 1.1,
    "audio-services": 1.0,
    "cybersecurity": 1.3
  };

  let price = basePrice[complexity] * experienceMultiplier[experience] * durationMultiplier[duration] * skillBonus[skill];

  // Adding slight randomness
//   price *= (Math.random() * (1.1 - 0.95) + 0.95); // Random between 0.95 and 1.1

  return Math.round(price * 100) / 100; // Rounded to 2 decimals
}

const updatePricing = () => {
  let skill = skillsel.value; 
    let exp = expsel.value;
    let comp = compsel.value; 
    let dur = dursel.value;
    const price = Math.floor(fetchPrice(skill, exp, comp, dur));
  pricebtn[0].innerText = `₹${price} - ₹${price+500} per hour`;
  pricebtn[1].innerText = `₹${price*18} - ₹${(price+500)*25}`;
  complexbtn.innerText = `${comp}-Level Complexity`;
  marklow[0].innerText = `₹${Math.floor(price-(price*0.3))}/hr`;
  markhi[0].innerText = `₹${Math.floor(price+(price*0.6))}/hr`;
  markavg[0].innerText = `₹${Math.floor((price-(price*0.3) + price+(price*0.6))/2)}/hr`;
  pastprojects.innerText = `Based on ${Math.floor((Math.random() * 300)+50)}+ similar projects completed on YuvaWorks in the last 30 days.`;
};

btn.addEventListener("click", () =>{
    updatePricing();
});