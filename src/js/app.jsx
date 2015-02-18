require('basscss/css/basscss.min.css');

const React = require('react/addons');
const AppActions = require('./actions/app_actions');
const AppStore = require('./stores/app_store');

const App = React.createClass({
  componentDidMount() {
    AppStore.addChangeListener(this.getComponentAndContext);
    AppActions.start();
  },

  componentWillUnmount() {
    AppStore.removeChangeListener(this.getComponentAndContext);
    AppActions.stop();
  },

  getComponentAndContext() {
    let Component = AppStore.getComponent();
    let context = AppStore.getContext();

    this.replaceState({
      component: <Component params={context.params} query={context.query} />
    });
  },

  getInitialState() {
    return {
      component: null
    }
  },

  render() {
    return (
      <div>
        {this.state.component}
      </div>
    );
  }
});

module.exports = App;

if (typeof window !== 'undefined') {
  React.render(
    <App />,
    document.getElementById('main')
  );
}
