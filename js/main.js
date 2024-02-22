(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });
    // URL to make request to
    const REVIEWS_URL = `https://api.reviewsmaker.com/gmb/?placeid=ChIJf-KiMUa5wjsRAgcZFqWNh3Y`;
    // Function to get reviews
    async function getReviews() {
        try {
            // Make request to Places API
            const response = await fetch(REVIEWS_URL);
            const data = await response.json();
            console.log(data);
            console.log(data.total_reviews);
            // Get reviews from the response
            const reviews = data.reviews;
            //console.log(reviews);
            // Filter reviews with 5 star rating
            const fiveStarReviews = reviews.filter(review => review.reviewRating === 5);
            console.log(fiveStarReviews);
            //console.log(fiveStarReviews);
            // Do something with the 5 star reviews
            // createReviews(fiveStarReviews);
            var reviewsNew = document.getElementById('reviews');
            for (var i = 0; i < fiveStarReviews.length; i++) {
                //     var review = fiveStarReviews[i];
                //     var reviewTemplate = `<div class="owl-item active" style="width: 408px; margin-right: 24px;"><div class="testimonial-item bg-transparent border rounded p-4">
                //     <i class="fa fa-quote-left fa-2x text-primary mb-3"></i>
                //     <p>${review.reviewText}</p>
                //     <div class="d-flex align-items-center">
                //         <img class="img-fluid flex-shrink-0 rounded-circle" src="img/testimonial-2.jpg" style="width: 50px; height: 50px;">
                //         <div class="ps-3">
                //             <h5 class="mb-1">${review.reviewAuthor}</h5>
                //             <small>Profession</small>
                //         </div>
                //     </div>
                // </div></div>`;
                // reviewsNew.append(reviewTemplate);
                var review = fiveStarReviews[i];
                var reviewTemplate = `
    
      <div class="testimonial-item bg-transparent border rounded p-4">
        <i class="fa fa-quote-left fa-2x text-primary mb-3"></i>
        <p>${review.reviewText}</p>
        <div class="d-flex align-items-center">
          <img class="img-fluid flex-shrink-0 rounded-circle" src="img/testimonial-2.jpg" style="width: 50px; height: 50px;">
          <div class="ps-3">
            <h5 class="mb-1">${review.reviewAuthor}</h5>
            <small>${review.reviewAuthorProfession}</small>
          </div>
        </div>
      </div>
   
  `;
                reviewsNew.insertAdjacentHTML("beforeend", reviewTemplate);

            }
            /**for (var i = 0; i < fiveStarReviews.length; i++) {
            var review = fiveStarReviews[i];

            if (review.reviewRating === 5) {
                let testimonialCarousel = document.querySelector('.owl-carousel.testimonial-carousel');
                const testimonialCarousel = document.createElement("div");
                testimonialCarousel.classList.add('owl-carousel testimonial-carousel');
                /**var container = document.getElementById("review-container");

                var reviewDiv = document.createElement("div");
                reviewDiv.classList.add("review");

                var text = document.createElement("p");
                text.classList.add("review-text");
                text.innerText = review.reviewText;

                var author = document.createElement("p");
                author.classList.add("review-author");
                author.innerText = review.reviewAuthor;

                reviewDiv.appendChild(text);
                reviewDiv.appendChild(author);

                container.appendChild(reviewDiv);

            let testimonialItem = document.createElement('div');
            testimonialItem.classList.add('testimonial-item', 'bg-transparent', 'border', 'rounded', 'p-4');

            let quoteLeft = document.createElement('i');
            quoteLeft.classList.add('fa', 'fa-quote-left', 'fa-2x', 'text-primary', 'mb-3');

            let quote = document.createElement('p');
            quote.textContent = review.reviewText;

            let dFlex = document.createElement('div');
            dFlex.classList.add('d-flex', 'align-items-center');

            let img = document.createElement('img');
            img.classList.add('img-fluid', 'flex-shrink-0', 'rounded-circle');
            img.src = "";
            img.style.width = '50px';
            img.style.height = '50px';

            let ps3 = document.createElement('div');
            ps3.classList.add('ps-3');

            let name = document.createElement('h5');
            name.classList.add('mb-1');
            name.textContent = review.reviewAuthor;

            let profession = document.createElement('small');
            profession.textContent = "profession";

            ps3.appendChild(name);
            ps3.appendChild(profession);
            dFlex.appendChild(img);
            dFlex.appendChild(ps3);
            testimonialItem.appendChild(quoteLeft);
            testimonialItem.appendChild(quote);
            testimonialItem.appendChild(dFlex);
            testimonialCarousel.appendChild(testimonialItem);
        }
    }*/
        } catch (error) {
            console.error(error);
        }
    }
    var reviews = getReviews(); // get the reviews from the API


    function createReviews(reviews) {
        // Get the testimonial carousel element
        //const carousel = document.querySelector('.testimonial-carousel');
        // Create the container div
        var container = document.createElement("div");
        container.className = "container-xxl py-5 wow fadeInUp";
        container.setAttribute("data-wow-delay", "0.1s");

        // Create the text-center div
        var textCenter = document.createElement("div");
        textCenter.className = "text-center";

        // Create the h5 element
        var h5 = document.createElement("h5");
        h5.className = "section-title ff-secondary text-center text-primary fw-normal";
        h5.innerHTML = "Testimonial";
        // Create the h1 element
        var h1 = document.createElement("h1");
        h1.innerHTML = "Our Clients Say!!!";

        // Append h5 and h1 to text-center div
        textCenter.appendChild(h5);
        textCenter.appendChild(h1);
        // Loop through the reviews array
        for (let i = 0; i < reviews.length; i++) {

            // Create the testimonial-carousel div
            var testimonialCarousel = document.createElement("div");
            testimonialCarousel.className = "owl-carousel testimonial-carousel";

            // Create the testimonial-item div
            var testimonialItem = document.createElement("div");
            testimonialItem.className = "testimonial-item bg-transparent border rounded p-4";
            // Create the i element
            var j = document.createElement("i");
            j.className = "fa fa-quote-left fa-2x text-primary mb-3";
            // Create the p element
            var p = document.createElement("p");
            p.innerHTML = reviews[i].reviewText;

            // Create the image element
            var img = document.createElement("img");
            img.className = "img-fluid flex-shrink-0 rounded-circle";
            img.src = "img/testimonial-1.jpg";
            img.style.width = "50px";
            img.style.height = "50px";

            // Create the client name and profession elements
            var clientName = document.createElement("h5");
            clientName.className = "mb-1";
            clientName.innerHTML = reviews[i].reviewAuthor;

            var profession = document.createElement("small");
            profession.innerHTML = "Profession";

            // Append all elements to the testimonial-item div
            testimonialItem.appendChild(j);
            testimonialItem.appendChild(p);
            testimonialItem.appendChild(img);
            testimonialItem.appendChild(clientName);
            testimonialItem.appendChild(profession);

            // Append the testimonial-item div to the testimonial-carousel div
            testimonialCarousel.appendChild(testimonialItem);

            // Append all elements to the container div
            container.appendChild(textCenter);
            container.appendChild(testimonialCarousel);

            // Append the container div to the body of the HTML document
            //document.body.appendChild

        }
        var reviews = document.getElementById("reviews");
        reviews.appendChild(container);






    }

})(jQuery);