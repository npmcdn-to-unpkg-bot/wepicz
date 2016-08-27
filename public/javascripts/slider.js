var
  posts,
  img,
  index = 1;

function img_create(src, alt, title) {
    var img= document.createElement('img');
    img.src= src;
    if (alt!=null) img.alt= alt;
    if (title!=null) img.title= title;
    return img;
}

axios.get('/slider/slider-data')
  .then(function (response) {
    console.log(response);


    if (response && response.data && response.data.length) {
      posts = response.data;

      img = img_create(posts[0].images.standard_resolution.url)

      document.body.appendChild(img);
    }

    setInterval(function(){
      img.src = posts[index % response.data.length].images.standard_resolution.url;

      index++;
    }, 3000);

  })
  .catch(function (error) {
    console.log(error);
  });
