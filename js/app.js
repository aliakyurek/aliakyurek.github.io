document.addEventListener('DOMContentLoaded', function() {
        const canvas = document.getElementById('matrix-rain');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to match header
        const header = document.querySelector('.page-header');
        canvas.width = header.offsetWidth;
        canvas.height = header.offsetHeight;
        
        // Hide the header content initially
        const headerContainer = header.querySelector('.container');
        headerContainer.classList.add('header-content-hidden');
        
        // Matrix characters - using a mix of katakana, latin and numbers
        const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        
        // Array to track the y position of each column
        const drops = [];
        let animationInterval;
        
        // Initialize drops
        for (let i = 0; i < columns; i++) {
          drops[i] = 1;
        }
        
        // Function to draw the matrix rain
        function draw() {
          // Semi-transparent black background to create fade effect
          ctx.fillStyle = 'rgba(80, 80, 80, 0.05)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Green text
          ctx.fillStyle = '#0F0';
          ctx.font = fontSize + 'px monospace';
          
          // Loop through each drop
          for (let i = 0; i < drops.length; i++) {
            // Select a random character
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            
            // Calculate y position
            const yPos = drops[i] * fontSize;
            
            // Draw the character
            ctx.fillText(text, i * fontSize, yPos);
            
            // Reset when drop reaches bottom or randomly to create varied streams
            if (yPos >= canvas.height - fontSize || Math.random() > 0.975) {
              drops[i] = 0;
            }
            
            // Move drop down
            drops[i]++;
          }
        }
        
        
        // Start animation
        animationInterval = setInterval(draw, 33);
        
        // Start fading out after 3 seconds while continuing the animation
        setTimeout(function() {
            
          setTimeout(function() {
            headerContainer.classList.add('header-content-visible');
          }, 500);
          let opacity = 0;
          // Create a persistent overlay that we'll adjust opacity on
          const fadeInterval = setInterval(function() {
            opacity += 0.03;
            
            if (opacity < 1) {
              // Draw the animation frame first
              draw();
              
              // Then apply the fading overlay directly on the main canvas
              ctx.fillStyle = `rgba(120, 120, 120, ${opacity})`;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            } else{
              // Once fully faded out, stop all animations
              clearInterval(fadeInterval);
              clearInterval(animationInterval);

            }
          }, 33);
          
          // Stop the original interval as we're now handling the drawing in the fade interval
          clearInterval(animationInterval);
        }, 2000);
      });
