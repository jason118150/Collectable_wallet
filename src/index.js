import React from 'react';
import { render } from 'react-dom';
import { ResetStyle, GlobalStyle } from './style/globalstyle';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { WalletDetail } from './page/detail';
import { WalletList } from './page/List/list';

const App = () => {
  return (
    <div>
      <ResetStyle />
      <GlobalStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/" exact component={WalletList} />
          <Route path="/:address/:id" component={WalletDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

render(<App />,document.getElementById('root'));
