fetch('dashboard.json') // URL of your JSON file or API endpoint
      .then(response => response.json()) // Parse the JSON data
      .then(data => {
        displayMovies(data); // Call the function to display movies
      })
      .catch(error => {
        console.error('Error fetching the movie data:', error);
      });

  function displayMovies(movies) {
        const container = document.getElementById('movies-container');
        
        // Loop through the movies array and create HTML elements dynamically
        movies.forEach(movie => {
          // Create a div element for each movie card
          const movieCard = document.createElement('div');
          movieCard.classList.add('movie-card');
          
          // Create the title element (h2)
          const movieTitle = document.createElement('h2');
          movieTitle.textContent = movie.Movie_name;
          
          // Create the image element
          const movieImage = document.createElement('img');
          movieImage.src = movie.image_url;
          movieImage.alt = movie.Movie_name;
          
          // Create the description element (p)
          const movieDescription = document.createElement('p');
          movieDescription.textContent = movie.description;  // Corrected this line
          
          // Append the title, image, and description to the movie card
          movieCard.appendChild(movieImage);
          movieCard.appendChild(movieTitle);
          movieCard.appendChild(movieDescription);
          
          // Append the movie card to the container
          container.appendChild(movieCard);
        });
      }
      