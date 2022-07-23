// Memasukkan key API
const weatherApi = "http://api.weatherapi.com/v1/current.json?key=7c1bf4fa4c284fa58b361846221206&aqi=no";
const keyword = document.getElementById("keyword");
const find = document.getElementById("find");
const output = document.getElementById("output");

keyword.addEventListener("keyup", function (e) {
  // jika e.key tidak berisi Enter maka keluar dari function.
  if (e.key !== "Enter") return;

  if (keyword.value.length == 0) {
    keyword.value = "";
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Univolved Value!",
    });
  }

  fetch(`${weatherApi}&q=${keyword.value}`)
    // mengubah response menjadi json
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        keyword.value = "";
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Undefined Value!",
        });
      }
      // membuat var kosong agar dapat diperbarui dan di isi kembali
      let element = "";
      //   Memasukkan hasil function ke dalam element
      element = showData(data);

      //   setiap output akan diperbarui / ditimpa dengan isi dari var element.
      output.innerHTML = element;
      const viewBtn = document.getElementById("view-button");

      viewBtn.onclick = () => {
        const viewMore = document.getElementById("view-more");

        viewMore.classList.toggle("view-more-dblock");
      };

      keyword.value = "";
    });
});

find.onclick = () => {
  if (keyword.value.length == 0) {
    keyword.value = "";
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "univolved Value!",
    });
  }

  fetch(`${weatherApi}&q=${keyword.value}`)
    // mengubah response menjadi json
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        keyword.value = "";
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Undefined Value!",
        });
      }
      // membuat var kosong agar dapat diperbarui dan di isi kembali
      let element = "";
      //   Memasukkan hasil function ke dalam element
      element = showData(data);

      //   setiap output akan diperbarui / ditimpa dengan isi dari var element.
      output.innerHTML = element;
      const viewBtn = document.getElementById("view-button");

      viewBtn.onclick = () => {
        const viewMore = document.getElementById("view-more");

        viewMore.classList.toggle("view-more-dblock");
      };

      keyword.value = "";
    });
};

function showData(data) {
  // langsung mengeluarkan value html fragment pada function showData, / mereturn html fragment.
  return `  <h3 id="location">${data.location.name}, ${data.location.region}, ${data.location.country}</h3>
                <div class="menu-box">
                <img src="https:${data.current.condition.icon}" alt="err">
                    <h2 id="degree">${data.current.temp_c}°</h2>
                    <button type="button" class="btn btn-info" id="view-button">Info</button>

                    <div id="view-more">
                            <p id="weather">${data.current.condition.text}</p>
                            <p>${data.current.last_updated}</p>
                            </br>
                            <p>uv: ${data.current.uv}</p>
                            <p>location: ${data.location.tz_id}</p>
                            <p>localtime: ${data.location.localtime}</p>
                        </div>
                </div>`;
}
