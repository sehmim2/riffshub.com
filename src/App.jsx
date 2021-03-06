import React from 'react';
import { Route } from 'react-router-dom';

//////////////////////////////////////////////////////////////////
  /* Core CSS required for Ionic components to work properly */
  import '@ionic/react/css/core.css';

  /* Basic CSS for apps built with Ionic */
  import '@ionic/react/css/normalize.css';
  import '@ionic/react/css/structure.css';
  import '@ionic/react/css/typography.css';

  /* Optional CSS utils that can be commented out */
  import '@ionic/react/css/padding.css';
  import '@ionic/react/css/float-elements.css';
  import '@ionic/react/css/text-alignment.css';
  import '@ionic/react/css/text-transformation.css';
  import '@ionic/react/css/flex-utils.css';
  import '@ionic/react/css/display.css';

  /* Theme variables */
  import './theme/variables.css';
//////////////////////////////////////////////////////////////////

// Ionic Stuff imported by me
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// My pages
import {Home} from './pages/Home';
import Authpage from "./pages/Authpage";
import UploadPage from "./pages/UploadPage"

// Configs && modules
import awsExports from "./aws-exports";
import Amplify, { Storage } from 'aws-amplify';

// CSS & assets
import "./App.css"

const App = () => {
  Amplify.configure(awsExports);
  Storage.configure({ level: 'public' });

  return ( 
    <IonApp className="App">
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={Home}/>
          <Route path="/auth" component={Authpage} to="/auth" />
          <Route path="/upload" component={UploadPage} to="/upload" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
