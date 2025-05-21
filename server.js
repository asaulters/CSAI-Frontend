import express from 'express';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle the subscribe endpoint
app.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Valid email is required' });
    }
    
    const apiKey = process.env.VITE_MC_API_KEY;
    const dc = process.env.VITE_MC_DC;
    const audienceId = process.env.VITE_MC_AUDIENCE_ID;
    
    // Prepare data for Mailchimp
    const data = JSON.stringify({
      email_address: email,
      status: 'subscribed'
    });
    
    // Set up the request to Mailchimp
    const options = {
      hostname: `${dc}.api.mailchimp.com`,
      path: `/3.0/lists/${audienceId}/members`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `apikey ${apiKey}`
      }
    };
    
    // Make the request to Mailchimp
    const mcRequest = https.request(options, (mcResponse) => {
      let responseData = '';
      
      mcResponse.on('data', (chunk) => {
        responseData += chunk;
      });
      
      mcResponse.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          
          if (mcResponse.statusCode >= 400) {
            // Handle already subscribed case
            if (parsedData.title === 'Member Exists') {
              return res.status(200).json({ message: 'You are already subscribed!' });
            }
            
            return res.status(mcResponse.statusCode).json({
              message: parsedData.title || 'Error subscribing to newsletter'
            });
          }
          
          return res.status(200).json({ message: 'Successfully subscribed!' });
        } catch (e) {
          return res.status(500).json({ message: 'Error processing response' });
        }
      });
    });
    
    mcRequest.on('error', (error) => {
      return res.status(500).json({ message: error.message });
    });
    
    mcRequest.write(data);
    mcRequest.end();
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
