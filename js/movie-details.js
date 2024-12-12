
// // Function to display movie details
// function displayMovieDetails() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const movieTitle = urlParams.get('title');

//     console.log("Movie Title from URL:", movieTitle);  // Check the movie title from URL

//     if (!movieTitle) {
//         document.getElementById('movie-details-container').innerHTML = '<p>Movie not found.</p>';
//         return;
//     }

//     // Fetch movie data from the JSON file
//     fetch(`/assets/json/main1.json?timestamp=${Date.now()}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to fetch movie data: ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Fetched movie data:', data);  // Log fetched data

//             const genres = ['action', 'comedy', 'romance', 'horror', 'thriller'];
//             let movie = null;
//             let movieGenre = '';

//             // Loop through all genres to find the movie
//             for (const genre of genres) {
//                 const movieList = data[genre];
//                 console.log(`Checking genre: ${genre}, Movies:`, movieList);

//                 if (!movieList) {
//                     console.warn(`No movies found for genre: ${genre}`);
//                     continue;
//                 }

//                 // Use Array.find to locate the movie title
//                 movie = movieList.find(m => m.title && m.title.toLowerCase() === movieTitle.toLowerCase());
//                 if (movie) {
//                     movieGenre = genre;
//                     break;
//                 }
//             }

//             if (movie) {
//                 console.log('Found movie:', movie);  // Log the found movie
//                 // Display the movie details
//                 document.getElementById('movie-details-container').innerHTML = ` 
//                     <div class="movie-details-card">
//                         <img class="movie-details-image" src="${movie.image_url}" alt="${movie.title}" loading="lazy">
//                         <div class="movie-details-info">
//                             <h2>${movie.title}</h2>
//                             <p><strong>Genre:</strong> ${movie.genre}</p>
//                             <p><strong>Director:</strong> ${movie.director || 'N/A'}</p>
//                             <p><strong>Release Year:</strong> ${movie.release_date}</p>
//                             <p><strong>Play Time:</strong> ${movie.play_time}</p>
//                             <p><strong>Rating:</strong> ${movie.rating}</p>
//                             <p><strong>Description:</strong> ${movie.description}</p>
//                             <a href="${movie.stream_url}" class="watch-now-btn">Watch Now</a>
//                         </div>
//                     </div>`;
//             } else {
//                 console.warn('Movie not found.');
//                 document.getElementById('movie-details-container').innerHTML = '<p>Movie details not available.</p>';
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching movie data:', error);
//             document.getElementById('movie-details-container').innerHTML = '<p>Failed to load movie details.</p>';
//         });
// }
// // Function to display a list of movies (up to 18)
// function displayMovieList(data) {
//     const genres = ['action', 'comedy', 'romance', 'horror', 'thiller'];
//     let allMovies = [];

//     // Collect movies from all genres
//     genres.forEach(genre => {
//         const movieList = data[genre];
//         if (movieList) {
//             allMovies = allMovies.concat(movieList);
//         }
//     });

//     // Limit to 18 movies
//     allMovies = allMovies.slice(0, 18); // Show only the first 18 movies

//     // Create headline HTML
//     const headlineHTML = `
//         <div class="movie-list-headline">
//             <h2>Some of the Movies</h2>
//         </div>
//     `;

//     // Generate the movie list HTML
//     const movieListHTML = allMovies.map(movie => 
//         `<div class="movie-list-item" onclick="showMovieDetails('${movie.title}')">
//             <h3 class="movie-list-title">${movie.title}</h3>
//             <img class="movie-list-image" src="${movie.image_url}" alt="${movie.title}" loading="lazy">
//         </div>`
//     ).join('');

//     // Insert the headline and movie list into the container
//     document.getElementById('movie-list-container').innerHTML = movieListHTML;
// }

// // Function to show the movie details when a list item is clicked
// function showMovieDetails(title) {
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set('title', title);  // Set the title in the URL
//     window.history.pushState({}, '', '?' + urlParams.toString());

//     // Re-display the movie details
//     displayMovieDetails();
// }

// // Call the function when the page loads
// displayMovieDetails();

// // Call the function to display the movie list when the page loads
// fetch(`/assets/json/main1.json?timestamp=${Date.now()}`)
//     .then(response => response.json())
//     .then(data => displayMovieList(data))
//     .catch(error => console.error('Error loading movie list:', error));

// // Call the function to display movie details when the page loads (if applicable)
// displayMovieDetails();








// document.addEventListener("DOMContentLoaded", function () {
//     const searchInput = document.getElementById('search-input');
//     const resultsContainer = document.getElementById("search-results");
//     const mainContainer = document.getElementById('mainContainer');

//     const jsonFilePath = '../assets/json/main1.json'; // Path to your JSON file

//     // Function to fetch all movies from the JSON file
//     async function loadMovies() {
//         try {
//             const response = await fetch(jsonFilePath);
//             if (!response.ok) {
//                 throw new Error("Network response was not ok: " + response.statusText);
//             }
//             const data = await response.json();

//             // Combine movies from different sections into one array
//             let allMovies = [];
//             for (const section in data) {
//                 if (Array.isArray(data[section])) {
//                     allMovies = allMovies.concat(data[section]);
//                 }
//             }
//             return allMovies;
//         } catch (error) {
//             console.error("Error fetching movie data:", error);
//             return [];
//         }
//     }

//     // Function to display results based on the first letter of the movie name
//     function displayResults(results) {
//         resultsContainer.innerHTML = ''; // Clear previous results

//         if (results.length === 0) {
//             resultsContainer.innerHTML = '<p>No movies found</p>';
//             return;
//         }

//         results.forEach(movie => {
//             const movieDiv = document.createElement('div');
//             movieDiv.classList.add('movie-result');
//             const imageUrl = movie.image_url || 'placeholder.jpg'; // Fallback to placeholder image

//             movieDiv.innerHTML = `
//                 <img src="${imageUrl}" alt="${movie.title}" width="100">
//                 <div>
//                     <h3>${movie.title}</h3>
//                 </div>
//             `;

//             // Handle movie click event to redirect to the movie details page
//             movieDiv.addEventListener('click', function () {
//                 window.location.href = `movie-details.html?title=${encodeURIComponent(movie.title)}`; // Redirect to the details page
//             });

//             resultsContainer.appendChild(movieDiv);
//         });
//     }

//     // Handle dynamic search as the user types
//     searchInput.addEventListener('input', async function () {
//         const searchQuery = searchInput.value.trim().toLowerCase();

//         if (searchQuery.length === 0) {
//             resultsContainer.innerHTML = ''; // Clear results if no search query
//             mainContainer.innerHTML = ''; // Clear main container display
//             return;
//         }

//         // Load all movies
//         const movies = await loadMovies();

//         // Filter movies based on the first letter of the title
//         const filteredMovies = movies.filter(movie => {
//             return movie.title && movie.title.toLowerCase().startsWith(searchQuery);
//         });

//         // Display the filtered results
//         displayResults(filteredMovies);
//     });
// });




// Function to display movie details
// function displayMovieDetails() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const movieTitle = urlParams.get('title');

//     console.log("Movie Title from URL:", movieTitle);  // Check the movie title from URL

//     if (!movieTitle) {
//         document.getElementById('movie-details-container').innerHTML = '<p>Movie not found.</p>';
//         return;
//     }

//     // Fetch movie data from the JSON file
//     fetch(`/assets/json/main1.json?timestamp=${Date.now()}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to fetch movie data: ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Fetched movie data:', data);  // Log fetched data

//             const genres = ['action', 'comedy', 'romance', 'horror', 'thriller'];
//             let movie = null;
//             let movieGenre = '';

//             // Loop through all genres to find the movie
//             for (const genre of genres) {
//                 const movieList = data[genre];
//                 console.log(`Checking genre: ${genre}, Movies:`, movieList);

//                 if (!movieList) {
//                     console.warn(`No movies found for genre: ${genre}`);
//                     continue;
//                 }

//                 // Use Array.find to locate the movie title
//                 movie = movieList.find(m => m.title && m.title.toLowerCase() === movieTitle.toLowerCase());
//                 if (movie) {
//                     movieGenre = genre;
//                     break;
//                 }
//             }

//             if (movie) {
//                 console.log('Found movie:', movie);  // Log the found movie
//                 // Display the movie details
//                 document.getElementById('movie-details-container').innerHTML = ` 
//                     <div class="movie-details-card">
//                         <img class="movie-details-image" src="${movie.image_url}" alt="${movie.title}" loading="lazy">
//                         <div class="movie-details-info">
//                             <h2>${movie.title}</h2>
//                             <p><strong>Genre:</strong> ${movie.genre}</p>
//                             <p><strong>Director:</strong> ${movie.director || 'N/A'}</p>
//                             <p><strong>Release Year:</strong> ${movie.release_date}</p>
//                             <p><strong>Play Time:</strong> ${movie.play_time}</p>
//                             <p><strong>Rating:</strong> ${movie.rating}</p>
//                             <p><strong>Description:</strong> ${movie.description}</p>
//                             <a href="${movie.stream_url}" class="watch-now-btn">Watch Now</a>
//                         </div>
//                     </div>`;
//             } else {
//                 console.warn('Movie not found.');
//                 document.getElementById('movie-details-container').innerHTML = '<p>Movie details not available.</p>';
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching movie data:', error);
//             document.getElementById('movie-details-container').innerHTML = '<p>Failed to load movie details.</p>';
//         });
// }
// // Function to display a list of movies (up to 18)
// function displayMovieList(data) {
//     const genres = ['action', 'comedy', 'romance', 'horror', 'thiller'];
//     let allMovies = [];

//     // Collect movies from all genres
//     genres.forEach(genre => {
//         const movieList = data[genre];
//         if (movieList) {
//             allMovies = allMovies.concat(movieList);
//         }
//     });

//     // Limit to 18 movies
//     allMovies = allMovies.slice(0, 18); // Show only the first 18 movies

//     // Create headline HTML
//     const headlineHTML = `
//         <div class="movie-list-headline">
//             <h2>Some of the Movies</h2>
//         </div>
//     `;

//     // Generate the movie list HTML
//     const movieListHTML = allMovies.map(movie => 
//         `<div class="movie-list-item" onclick="showMovieDetails('${movie.title}')">
//             <h3 class="movie-list-title">${movie.title}</h3>
//             <img class="movie-list-image" src="${movie.image_url}" alt="${movie.title}" loading="lazy">
//         </div>`
//     ).join('');

//     // Insert the headline and movie list into the container
//     document.getElementById('movie-list-container').innerHTML = movieListHTML;
// }

// // Function to show the movie details when a list item is clicked
// function showMovieDetails(title) {
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set('title', title);  // Set the title in the URL
//     window.history.pushState({}, '', '?' + urlParams.toString());

//     // Re-display the movie details
//     displayMovieDetails();
// }

// // Call the function when the page loads
// displayMovieDetails();

// // Call the function to display the movie list when the page loads
// fetch(`/assets/json/main1.json?timestamp=${Date.now()}`)
//     .then(response => response.json())
//     .then(data => displayMovieList(data))
//     .catch(error => console.error('Error loading movie list:', error));

// // Call the function to display movie details when the page loads (if applicable)
// displayMovieDetails();








// document.addEventListener("DOMContentLoaded", function () {
//     const searchInput = document.getElementById('search-input');
//     const resultsContainer = document.getElementById("search-results");
//     const mainContainer = document.getElementById('mainContainer');

//     const jsonFilePath = '../assets/json/main1.json'; // Path to your JSON file

//     // Function to fetch all movies from the JSON file
//     async function loadMovies() {
//         try {
//             const response = await fetch(jsonFilePath);
//             if (!response.ok) {
//                 throw new Error("Network response was not ok: " + response.statusText);
//             }
//             const data = await response.json();

//             // Combine movies from different sections into one array
//             let allMovies = [];
//             for (const section in data) {
//                 if (Array.isArray(data[section])) {
//                     allMovies = allMovies.concat(data[section]);
//                 }
//             }
//             return allMovies;
//         } catch (error) {
//             console.error("Error fetching movie data:", error);
//             return [];
//         }
//     }

//     // Function to display results based on the first letter of the movie name
//     function displayResults(results) {
//         resultsContainer.innerHTML = ''; // Clear previous results

//         if (results.length === 0) {
//             resultsContainer.innerHTML = '<p>No movies found</p>';
//             return;
//         }

//         results.forEach(movie => {
//             const movieDiv = document.createElement('div');
//             movieDiv.classList.add('movie-result');
//             const imageUrl = movie.image_url || 'placeholder.jpg'; // Fallback to placeholder image

//             movieDiv.innerHTML = `
//                 <img src="${imageUrl}" alt="${movie.title}" width="100">
//                 <div>
//                     <h3>${movie.title}</h3>
//                 </div>
//             `;

//             // Handle movie click event to redirect to the movie details page
//             movieDiv.addEventListener('click', function () {
//                 window.location.href = `movie-details.html?title=${encodeURIComponent(movie.title)}`; // Redirect to the details page
//             });

//             resultsContainer.appendChild(movieDiv);
//         });
//     }

//     // Handle dynamic search as the user types
//     searchInput.addEventListener('input', async function () {
//         const searchQuery = searchInput.value.trim().toLowerCase();

//         if (searchQuery.length === 0) {
//             resultsContainer.innerHTML = ''; // Clear results if no search query
//             mainContainer.innerHTML = ''; // Clear main container display
//             return;
//         }

//         // Load all movies
//         const movies = await loadMovies();

//         // Filter movies based on the first letter of the title
//         const filteredMovies = movies.filter(movie => {
//             return movie.title && movie.title.toLowerCase().startsWith(searchQuery);
//         });

//         // Display the filtered results
//         displayResults(filteredMovies);
//     });
// });



// function displayMovieDetails() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const movieTitle = urlParams.get('title');
//     if (!movieTitle) {
//       document.getElementById('movie-details-container').innerHTML = '<p>Movie not found.</p>';
//       return;
//     }
//     // Fetch movie data from the JSON file
//     fetch("/assets/json/movie-details.js")
//       .then(response => response.json())
//       .then(data => {
//         const allMovies = [...data.movies];
//         const movie = allMovies.find(movie => movie.title === movieTitle);
//         if (movie) {
//           // Display the selected movie details
//           document.getElementById('movie-details-container').innerHTML = `
//             <div class="movie-details-card">
//               <img class="movie-details-image" src="${movie.image_url}" alt="${movie.title}" loading="lazy">
//               <div class="movie-details-info">
//                 <h2>${movie.title}</h2>
//                 <p><strong>Genre:</strong> ${movie.genre}</p>
//                 <p><strong>Director:</strong> ${movie.director}</p>
//                 <p><strong>Release Year:</strong> ${movie.release_date}</p>
//                 <p><strong>Play Time:</strong> ${movie.play_time}</p>
//                 <p><strong>Rating:</strong> ${movie.rating}</p>
//                 <p><strong>Description:</strong> ${movie.description}</p>
//                 <button class="watch-now-btn">Watch Now</button>
//               </div>
//             </div>`;
//           // Filter related movies (exclude the current movie)
//           const suggestedMovies = allMovies.filter(m => m.title !== movie.title);
//           // Display all suggested movies
//           const renderSuggestions = (movies) => {
//             const suggestionsHTML = movies.map(suggestedMovie => `
//               <div class="movie-card suggestion-card">
//                 <img class="movie-image" src="${suggestedMovie.image_url}" alt="${suggestedMovie.title}" loading="lazy">
//                 <div class="movie-info">
//                   <h3 class="movie-title">${suggestedMovie.title}</h3>
//                 </div>
//               </div>
//             `).join('');
//             // Update suggestions container
//             document.querySelector('.suggestions-container').innerHTML = suggestionsHTML;
//             // Add click listeners to suggestion cards
//             document.querySelectorAll('.suggestion-card').forEach(card => {
//               card.addEventListener('click', () => {
//                 const suggestedTitle = card.querySelector('.movie-title').textContent;
//                 window.location.href = `next.html?title=${encodeURIComponent(suggestedTitle)}`;
//               });
//             });
//           };
//           // Append suggestions below the movie details with search bar
//           document.getElementById('movie-details-container').innerHTML += `
//             <div class="suggestions-section">
//               <h3>Suggested Movies</h3>
//               <div class="suggestions-container"></div>
//             </div>`;
//           // Initial render of all suggested movies
//           renderSuggestions(suggestedMovies);
//           // Add real-time search functionality
//           const searchBar = document.getElementById('suggestion-search-bar');
//           searchBar.addEventListener('input', (event) => {
//             const query = event.target.value.toLowerCase();
//             const filteredMovies = suggestedMovies.filter(movie =>
//               movie.title.toLowerCase().includes(query) ||
//               (movie.genre && movie.genre.toLowerCase().includes(query))
//             );
//             renderSuggestions(filteredMovies);
//           });
//         } else {
//           document.getElementById('movie-details-container').innerHTML = '<p>Movie details not available.</p>';
//         }
//       })
//       .catch(error => {
//         console.error('Error fetching movie data:', error);
//         document.getElementById('movie-details-container').innerHTML = '<p>Failed to load movie details.</p>';
//       });
//   }
//   // Call the function when the page loads
//   window.onload = displayMovieDetails;









// Function to display movie details
function displayMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title');

    console.log("Movie Title from URL:", movieTitle);  // Check the movie title from URL

    if (!movieTitle) {
        document.getElementById('movie-details-container').innerHTML = '<p>Movie not found.</p>';
        return;
    }

    // Fetch movie data from the JSON file
    fetch(`/assets/json/main1.json?timestamp=${Date.now()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch movie data: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched movie data:', data);  // Log fetched data

            const genres = ['action', 'comedy', 'romance', 'horror', 'thriller'];
            let movie = null;
            let movieGenre = '';

            // Loop through all genres to find the movie
            for (const genre of genres) {
                const movieList = data[genre];
                console.log(`Checking genre: ${genre}, Movies:`, movieList);

                if (!movieList) {
                    console.warn(`No movies found for genre: ${genre}`);
                    continue;
                }

                // Use Array.find to locate the movie title
                movie = movieList.find(m => m.title && m.title.toLowerCase() === movieTitle.toLowerCase());
                if (movie) {
                    movieGenre = genre;
                    break;
                }
            }

            if (movie) {
                console.log('Found movie:', movie);  // Log the found movie
                // Display the movie details
                document.getElementById('movie-details-container').innerHTML = ` 
                    <div class="movie-details-card">
                        <img class="movie-details-image" src="${movie.image_url}" alt="${movie.title}" loading="lazy">
                        <div class="movie-details-info">
                            <h2>${movie.title}</h2>
                            <p><strong>Genre:</strong> ${movie.genre}</p>
                            <p><strong>Director:</strong> ${movie.director || 'N/A'}</p>
                            <p><strong>Release Year:</strong> ${movie.release_date}</p>
                            <p><strong>Play Time:</strong> ${movie.play_time}</p>
                            <p><strong>Rating:</strong> ${movie.rating}</p>
                            <p><strong>Description:</strong> ${movie.description}</p>
                            <a href="${movie.stream_url}" class="watch-now-btn">Watch Now</a>
                        </div>
                    </div>`;
            } else {
                console.warn('Movie not found.');
                document.getElementById('movie-details-container').innerHTML = '<p>Movie details not available.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
            document.getElementById('movie-details-container').innerHTML = '<p>Failed to load movie details.</p>';
        });
}

// Function to display a list of movies (up to 18)
function displayMovieList(data) {
    const genres = ['action', 'comedy', 'romance', 'horror', 'thiller'];
    let allMovies = [];

    // Collect movies from all genres
    genres.forEach(genre => {
        const movieList = data[genre];
        if (movieList) {
            allMovies = allMovies.concat(movieList);
        }
    });

    // Limit to 18 movies
    allMovies = allMovies.slice(0, 18); // Show only the first 18 movies

    //Create headline HTML
    const headlineHTML = `
        <div class="movie-list-headline">
            <h2>Some of the Movies</h2>
        </div>
    `;

    // Generate the movie list HTML
    const movieListHTML = allMovies.map(movie => 
        `<div class="movie-list-item" onclick="showMovieDetails('${movie.title}')">
            <h3 class="movie-list-title">${movie.title}</h3>
            <img class="movie-list-image" src="${movie.image_url}" alt="${movie.title}" loading="lazy">
        </div>`
    ).join('');

    // Insert the headline and movie list into the container
    document.getElementById('movie-list-container').innerHTML = movieListHTML;
}

 // Function to show the movie details when a list item is clicked
 function showMovieDetails(title) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('title', title);  // Set the title in the URL
    window.history.pushState({}, '', '?' + urlParams.toString());
    // Re-display the movie details
     displayMovieDetails();
 }

 // Call the function when the page loads
 displayMovieDetails();

 // Call the function to display the movie list when the page loads
 fetch(`/assets/json/main1.json?timestamp=${Date.now()}`)
     .then(response => response.json())
     .then(data => displayMovieList(data))
    .catch(error => console.error('Error loading movie list:', error));

 // Call the function to display movie details when the page loads (if applicable)
 displayMovieDetails();












































document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById("search-results");
    const mainContainer = document.getElementById('mainContainer');

    const jsonFilePath = '../assets/json/main1.json'; // Path to your JSON file

    // Function to fetch all movies from the JSON file
    async function loadMovies() {
        try {
            const response = await fetch(jsonFilePath);
            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.statusText);
            }
            const data = await response.json();

            // Combine movies from different sections into one array
            let allMovies = [];
            for (const section in data) {
                if (Array.isArray(data[section])) {
                    allMovies = allMovies.concat(data[section]);
                }
            }
            return allMovies;
        } catch (error) {
            console.error("Error fetching movie data:", error);
            return [];
        }
    }

    // Function to display results based on the first letter of the movie name
    function displayResults(results) {
        resultsContainer.innerHTML = ''; // Clear previous results

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No movies found</p>';
            return;
        }

        results.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie-result');
            const imageUrl = movie.image_url || 'placeholder.jpg'; // Fallback to placeholder image

            movieDiv.innerHTML = `
                <img src="${imageUrl}" alt="${movie.title}" width="100">
                <div>
                    <h3>${movie.title}</h3>
                </div>
            `;

            // Handle movie click event to redirect to the movie details page
            movieDiv.addEventListener('click', function () {
                window.location.href = `movie-details.html?title=${encodeURIComponent(movie.title)}`; // Redirect to the details page
            });

            resultsContainer.appendChild(movieDiv);
        });
    }

    // Handle dynamic search as the user types
    searchInput.addEventListener('input', async function () {
        const searchQuery = searchInput.value.trim().toLowerCase();

        if (searchQuery.length === 0) {
            resultsContainer.innerHTML = ''; // Clear results if no search query
            mainContainer.innerHTML = ''; // Clear main container display
            return;
        }

        // Load all movies
        const movies = await loadMovies();

        // Filter movies based on the first letter of the title
        const filteredMovies = movies.filter(movie => {
            return movie.title && movie.title.toLowerCase().startsWith(searchQuery);
        });

        // Display the filtered results
        displayResults(filteredMovies);
    });
});



