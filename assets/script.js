document.addEventListener("DOMContentLoaded", function () {
  const articles_container = document.querySelector(".articles_container");
  const more_button = document.querySelector(".more_button");
  const submit_form_button = document.querySelector(".submit_form_button");
  const close_form_button = document.querySelector(".close_form_button");
  const add_article_button = document.querySelector(".add_article_button");
  const add_article_form = document.querySelector(".add_article_form");

  add_article_button.addEventListener("click", function () {
    add_article_form.style.display = "flex";
  });
  close_form_button.addEventListener("click", function () {
    add_article_form.style.display = "none";
  });

  let limit = 4;
  let start = 0;

  function fetchArticles() {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const articlesToShow = data.slice(start, start + limit);
        // Ici, data est disponible
        articlesToShow.forEach((article) => {
          const div = document.createElement("div");
          div.classList.add("article");
          div.innerHTML = `
          <img src="${article.image}" alt="${article.title}" class="article_image">
          <div class="articles_infos">
              <p class="article_title">${article.title}</p>
              <p class="article_category">Catégorie : ${article.category}</p>
              <p class="article_description">Description : ${article.description}</p>
              <p class="article_price">Prix : ${article.price}€</p>
              <button class="update_article_button">Modifier</button>
              <button class="delete_article_button">Supprimer</button>
              <p class="article_id">${article.id}</p>
          </div>
        `;

          const delete_article_button = div.querySelector(".delete_article_button");
          delete_article_button.addEventListener("click", function () {
            const idText = this.parentElement.querySelector(".article_id").textContent;
            const id = parseFloat(idText.replace(/[^\d.]/g, ""));
            deleteArticle(id);
            console.log(id);
          });

          const update_article_button = div.querySelector(".update_article_button");
          update_article_button.addEventListener("click", function () {
            add_article_form.style.display = "flex";

            const parentDiv = this.parentElement;
            const img = this.parentElement.parentElement;

            const title = parentDiv.querySelector(".article_title").textContent;
            const category = parentDiv.querySelector(".article_category").textContent;
            const description = parentDiv.querySelector(".article_description").textContent;
            const image = img.querySelector(".article_image").src;
            const priceText = parentDiv.querySelector(".article_price").textContent;
            const idText = parentDiv.querySelector(".article_id").textContent;
            const price = parseFloat(priceText.replace(/[^\d.]/g, ""));
            const id = parseFloat(idText.replace(/[^\d.]/g, ""));

            add_article_form.querySelector(".input_title").value = title;
            add_article_form.querySelector(".input_category").value = category;
            add_article_form.querySelector(".input_description").value = description;
            add_article_form.querySelector(".input_price").value = price;
            add_article_form.querySelector(".input_image").value = image;

            // Retirer l'ancien listener pour éviter plusieurs PUT au clic
            const newButton = submit_form_button.cloneNode(true);
            submit_form_button.parentNode.replaceChild(newButton, submit_form_button);

            newButton.addEventListener("click", function (e) {
              e.preventDefault();
              const updatedArticle = {
                title: add_article_form.querySelector(".input_title").value,
                category: add_article_form.querySelector(".input_category").value,
                description: add_article_form.querySelector(".input_description").value,
                price: parseFloat(add_article_form.querySelector(".input_price").value),
                image: add_article_form.querySelector(".input_image").value,
              };
              putArticle(updatedArticle, id);
              // trouver le div de l'article correspondant
              const articleDiv = Array.from(document.querySelectorAll(".article")).find((div) => {
                const articleId = div.querySelector(".article_id").textContent;
                return parseInt(articleId) === id;
              });
              if (articleDiv) {
                articleDiv.querySelector(".article_title").textContent = updatedArticle.title;
                articleDiv.querySelector(".article_category").textContent = "Catégorie : " + updatedArticle.category;
                articleDiv.querySelector(".article_description").textContent = updatedArticle.description;
                articleDiv.querySelector(".article_price").textContent = "Prix : " + updatedArticle.price + "€";
                articleDiv.querySelector(".article_image").src = updatedArticle.image;
              }
              add_article_form.style.display = "none";
            });
          });

          articles_container.appendChild(div);
        });
        start += limit;
        if (start >= data.length) {
          more_button.disabled = true;
          more_button.textContent = "Plus aucun articles disponible";
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des produits :", error);
      });
  }

  function postArticle() {
    let title_value = document.querySelector(".input_title").value;
    let category_value = document.querySelector(".input_category").value;
    let description_value = document.querySelector(".input_description").value;
    let price_value = document.querySelector(".input_price").value;
    let image_value = document.querySelector(".input_image").value;

    const article = {
      title: title_value,
      category: category_value,
      description: description_value,
      price: parseFloat(price_value),
      image: image_value,
    };
    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const div = document.createElement("div");
        div.classList.add("article");
        div.innerHTML = `
    <img src="${data.image}" alt="${data.title}" class="article_image">
    <div class="articles_infos">
        <p class="article_title">${data.title}</p>
        <p class="article_category">Catégorie : ${data.category}</p>
        <p class="article_description">Description : ${data.description}</p> <br>
        <p class="article_price">Prix : ${data.price}€</p>
        <p class="article_id">ID : ${data.id}</p>

    </div>
  `;
        articles_container.appendChild(div);
        // Reset du formulaire
        document.querySelector(".input_title").value = "";
        document.querySelector(".input_category").value = "";
        document.querySelector(".input_description").value = "";
        document.querySelector(".input_price").value = "";
        document.querySelector(".input_image").value = "";
      })
      .catch((error) => console.error("Erreur lors de l'envoi :", error));
  }

  function putArticle(newArt, id) {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArt),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function deleteArticle(id) {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  submit_form_button.addEventListener("click", function (e) {
    e.preventDefault();
    postArticle();
  });

  more_button.addEventListener("click", fetchArticles);

  fetchArticles();
});
