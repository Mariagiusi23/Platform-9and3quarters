document.addEventListener("DOMContentLoaded", async () => {
  const houseData = {
    Grifondoro: {
      image: "images/Casa_comune_grifondoro.webp",
      info: "Coraggio, audacia e determinazione."
    },
    Corvonero: {
      image: "images/Sala_comune_Corvonero_.webp",
      info: "Intelligenza, curiosità e creatività."
    },
    Tassorosso: {
      image: "images/Sala_comune_di_tassorosso.webp",
      info: "Lealtà, pazienza e dedizione."
    },
    Serpeverde: {
      image: "images/Casa_comune_serpeverde.webp",
      info: "Ambizione, astuzia e intraprendenza."
    }
  };

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  try {
    const response = await fetch("php/get_profile.php");
    const data = await response.json();
    if (!data.success || !data.user) return;

    const user = data.user;
    const house = user.house || "";
    const houseInfo = houseData[house];

    setText("nav-username", user.username || "Profilo");
    setText("home-vault-number", user.numero_caveau || "Non assegnato");
    setText("home-vault-balance", user.soldi_caveau ?? 0);
    setText("home-house-name", house || "Casata non scelta");
    setText(
      "home-house-info",
      houseInfo ? houseInfo.info : "Completa il Test della Casa per registrare la tua casata."
    );

    const crest = document.getElementById("home-house-crest");
    if (crest && houseInfo) {
      crest.src = houseInfo.image;
      crest.alt = house;
    }
  } catch (error) {
    console.warn("Impossibile caricare i dati della home:", error);
  }
});
