import express from 'express';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Parse JSON bodies
app.use(express.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle the subscribe endpoint
app.post('/subscribe', async (req, res) => {
  try {
    console.log('Subscribe request received:', JSON.stringify(req.body, null, 2));
    
    const { email, apiKey, dc, audienceId } = req.body;
    
    if (!email || !email.includes('@')) {
      console.log('Invalid email:', email);
      return res.status(400).json({ message: 'Valid email is required' });
    }
    
    if (!apiKey || !dc || !audienceId) {
      console.log('Missing Mailchimp configuration:', { apiKey: !!apiKey, dc: !!dc, audienceId: !!audienceId });
      return res.status(400).json({ message: 'Missing Mailchimp configuration' });
    }
    
    console.log('Preparing Mailchimp request for email:', email);
    
    // Prepare data for Mailchimp
    const data = JSON.stringify({
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: 'Subscriber' // Adding the required FNAME field
      }
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
    console.log('Sending request to Mailchimp:', options.hostname + options.path);
    
    const mcRequest = https.request(options, (mcResponse) => {
      console.log('Received response from Mailchimp with status:', mcResponse.statusCode);
      
      let responseData = '';
      
      mcResponse.on('data', (chunk) => {
        responseData += chunk;
      });
      
      mcResponse.on('end', () => {
        console.log('Mailchimp response data:', responseData);
        
        try {
          const parsedData = JSON.parse(responseData);
          
          if (mcResponse.statusCode >= 400) {
            console.log('Mailchimp error:', parsedData);
            
            // Handle already subscribed case
            if (parsedData.title === 'Member Exists') {
              console.log('Member already exists');
              return res.status(200).json({ message: 'You are already subscribed!' });
            }
            
            return res.status(mcResponse.statusCode).json({
              message: parsedData.title || 'Error subscribing to newsletter'
            });
          }
          
          console.log('Successfully subscribed to Mailchimp');
          return res.status(200).json({ message: 'Successfully subscribed!' });
        } catch (e) {
          console.error('Error parsing Mailchimp response:', e);
          return res.status(500).json({ message: 'Error processing response' });
        }
      });
    });
    
    mcRequest.on('error', (error) => {
      console.error('Mailchimp request error:', error);
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
