function navigate(page) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById(page).style.display = 'block';
}

function saveStrain() {
    const name = document.getElementById("strainName").value.trim();
    const type = document.getElementById("strainType").value;
    const checkboxes = document.querySelectorAll("#entry input[type=checkbox]:checked");
    const terpenes = Array.from(checkboxes).map(cb => cb.value);
    const percent = document.getElementById("terpPercent").value;
    const description = document.getElementById("description").value.trim();

    if (!name || !type || terpenes.length === 0 || !percent) {
        alert("Please fill all required fields.");
        return;
    }

    const strain = { name, type, terpenes, percent, description };
    let strains = JSON.parse(localStorage.getItem("strains")) || [];
    strains.push(strain);
    localStorage.setItem("strains", JSON.stringify(strains));
    alert("Strain saved!");
    document.getElementById("strainName").value = "";
    document.getElementById("strainType").value = "";
    checkboxes.forEach(cb => cb.checked = false);
    document.getElementById("terpPercent").value = "";
    document.getElementById("description").value = "";
}

function searchStrains() {
    const name = document.getElementById("searchName").value.toLowerCase();
    const type = document.getElementById("searchType").value;
    const terp = document.getElementById("searchTerp").value.toLowerCase();
    const percent = document.getElementById("searchPercent").value;
    const desc = document.getElementById("searchDesc").value.toLowerCase();

    const strains = JSON.parse(localStorage.getItem("strains")) || [];
    const results = strains.filter(strain => {
        return (!name || strain.name.toLowerCase().includes(name)) &&
               (!type || strain.type === type) &&
               (!terp || strain.terpenes.some(t => t.toLowerCase().includes(terp))) &&
               (!percent || parseFloat(strain.percent) === parseFloat(percent)) &&
               (!desc || strain.description.toLowerCase().includes(desc));
    });

    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";
    results.forEach((s, i) => {
        const li = document.createElement("li");
        li.textContent = `${s.name} (${s.type})`;
        li.ondblclick = () => showDetail(s);
        resultsList.appendChild(li);
    });
}

function showDetail(strain) {
    navigate('detail');
    const detailDiv = document.getElementById("detailContent");
    detailDiv.innerHTML = `
        <p><strong>Name:</strong> ${strain.name}</p>
        <p><strong>Type:</strong> ${strain.type}</p>
        <p><strong>Terpenes:</strong> ${strain.terpenes.join(', ')}</p>
        <p><strong>Terpene %:</strong> ${strain.percent}</p>
        <p><strong>Description:</strong> ${strain.description}</p>
    `;
}