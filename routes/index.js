import { groupItemStyles } from "@atlaskit/button/dist/cjs/button-group";
import hbs from "express-hbs";



hbs.registerHelper("draw",function(site, project, landJSON) {
  const { createCanvas } = require('canvas')
  const canvas = createCanvas(600, 200)

  // Standard Spacers
  var widthSpacer = 20;
  var hightSpacer = 20;

  // Component Standard Size
  var componentHight = 50
  var componentWidth = 100

    //Used in Calculation of groups
    var hightPerRow = 100
    var widthPerComponent = componentWidth + widthSpacer
  
  console.log("Helper Site : ", site);        
  console.log("Helper Project : ", project);        
  console.log("JSON : ", landJSON)
  if (canvas.getContext) {
    // For each group I need to draw it - calculate it's length and width - put in text
    var context = canvas.getContext('2d');

    var currentX = 0
    var currenyY = 0

    // We are gonna do some groups first

    context.fillRect(20,20,100,100);
    context.clearRect(40,40,60,60);
    context.strokeRect(45,45,50,50);
  }  
  return canvas.toDataURL()
});

export default function routes(app, addon) {



  // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    // This is an example route used by "generalPages" module (see atlassian-connect.json).
    // Verify that the incoming request is authenticated with Atlassian Connect.
    app.get('/hello-world', addon.authenticate(), (req, res) => {
      console.log("My Log Message");
      var hostBaseUrl = req.context.hostBaseUrl;
      //var projectKey = req.context.project.key;
      console.log("Base URL: ", hostBaseUrl);        
      //console.log("Project: ", projectKey);        
      // Rendering a template is easy; the render method takes two params: the name of the component or template file, and its props.
        // Handlebars and jsx are both supported, but please note that jsx changes require `npm run watch-jsx` in order to be picked up by the server.
        res.render(
          'hello-world.hbs', // change this to 'hello-world.jsx' to use the Atlaskit & React version
          {
            title: 'Atlassian Connect'
            //, issueId: req.query['issueId']
            //, browserOnly: true // you can set this to disable server-side rendering for react views
          }
        );
    });

        // This is an example route used by "generalPages" module (see atlassian-connect.json).
    // Verify that the incoming request is authenticated with Atlassian Connect.
    app.get('/left-world', addon.authenticate(), (req, res) => {
      //console.log("My Log Message");
      var hostBaseUrl = req.context.hostBaseUrl;
      var projectKey = req.query['projectKey'];
      //console.log("Base URL: ", hostBaseUrl);        
      //console.log("Project: ", projectKey);    
      
      const https = require('https');

      //@@@@@@@@@ HTTPS in the site???!?!?!?!?!??!
      console.log("@@@@@@@@@ Make all these things variables and don't forget the https issue @@@@@@@@@@");    
      var options = {
        host: 'landscape-api-1vk80nzs.ue.gateway.dev',
        port: 443,
        path: '/landscape?site=jdetech.atlassian.net&projectID=JL',
        method: 'GET',
        headers: { 'x-api-key': 'AIzaSyAI4xplSIn-tzvjDF_A1MsNZ7G7PqSi02w' }
      };

      //https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
      var lreq = https.request(options, (resp) => {
        console.log('statusCode:', resp.statusCode);
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          //console.log(JSON.parse(data));
          var jsonObject = JSON.parse(data);
          res.render('hello-grid-rect.hbs', {title: jsonObject.landscapeTitle, projectKey: req.query['projectKey'],jLand: jsonObject});
        });

        }).on("error", (err) => { 
          console.error("Error: " + err.message);
      });
      lreq.end();
    });

    // Add additional route handlers here...
}
