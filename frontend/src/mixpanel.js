import mixpanel from 'mixpanel-browser';
mixpanel.init('dfdfcd2eb9d6ffcba3dee21fa755393e', { debug: true });

let env_check = true;

let actions = {
  identify: (id) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
  reset: () => {
    mixpanel.reset();
  }
};

export let Mixpanel = actions;