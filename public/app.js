// const TimersDashboard = React.createClass({
//   getInitialState: function() {
//     return {
//       timers: [], 
//     };
//   },
//   componentDidMount: function() {
//     this.loadTimersFromServer();
//     setInterval(this.loadTimersFromServer, 5000);
//   },
//   loadTimersFromServer: function() {
//     client.getTimers((serverTimers) => (
//       this.setState({ timers: serverTimers })
//     ));
//   },
//   handleCreateFormSubmit: function(timer) {
//     this.createTimer(timer);
//   },
//   handleTrashClick: function(timerId) {
//     this.deleteTimer(timerId);
//   },
//   handleEditClick: function(attrs) {
//     this.updateTimer(attrs);
//   },
//   handleStopClick: function(timerId) {
//     this.stopTimer(timerId);
//   },
//   handleStartClick: function(timerId) {
//     this.startTimer(timerId);
//   },
//   createTimer(timer) {
//     const t = helpers.newTimer(timer);
//     this.setState({ timers: [...this.state.timers, t] });

//     client.createTimer(t);
//   },
//   deleteTimer(timerId) {
//     this.setState({
//       timers: this.state.timers.filter( (timer) => timer.id !== timerId ),
//     });

//     client.deleteTimer({ id: timerId });
//   },
//   updateTimer(attrs) {
//     this.setState({
//       timers: this.state.timers.map((timer) => {
//         if (attrs.id === timer.id) {
//           return Object.assign({}, timer, {
//             title: attrs.title,
//             project: attrs.project,
//           });
//         } else {
//           return timer;
//         }
//       }),
//     });

//     client.updateTimer(attrs);
//   },
//   stopTimer(timerId) {
//     const now = Date.now();
//     this.setState({
//       timers: this.state.timers.map((timer) => {
//         if (timer.id === timerId) {
//           return Object.assign({}, timer, {
//             elapsed: now - timer.runningSince + timer.elapsed,
//             runningSince: null,
//           });
//         } else {
//           return timer;
//         }
//       }),
//     });

//     client.stopTimer({ id: timerId, stop: now });
//   },
//   startTimer(timerId) {
//     const now = Date.now();
//     this.setState({
//       timers: this.state.timers.map((timer) => {
//         if (timer.id === timerId) {
//           return Object.assign({}, timer, {
//             runningSince: now,
//           });
//         } else {
//           return timer;
//         }
//       }),
//     });

//     client.startTimer({ id: timerId, start: now });
//   },
//   render: function() {
//     return (
//       <div className="ui three column centered grid">
//         <div className="column">
//           <EditableTimerList
//             timers={this.state.timers}
//             onTrashClick={this.handleTrashClick}
//             onFormSubmit={this.handleEditClick}
//             onStopClick={this.handleStopClick}
//             onStartClick={this.handleStartClick}
//           />

//           <ToggleableTimerForm
//             onFormSubmit={this.handleCreateFormSubmit}
//           />
//         </div>
//       </div>
//     );
//   }
// });

// const EditableTimerList = React.createClass({
//   render: function() {
//     const timers = this.props.timers.map((timer) => (
//       <EditableTimer
//         key={timer.id}
//         id={timer.id}
//         title={timer.title}
//         project={timer.project}
//         elapsed={timer.elapsed}
//         runningSince={timer.runningSince}
//         onTrashClick={this.props.onTrashClick}
//         onFormSubmit={this.props.onFormSubmit}
//         onStopClick={this.props.onStopClick}
//         onStartClick={this.props.onStartClick}
//       />
//     ));
//     return (
//       <div id="timers">{timers}</div>
//     );
//   }
// });

// const ToggleableTimerForm = React.createClass({
//   getInitialState: function() {
//     return {
//       isOpen: false, 
//     };
//   },
//   handleFormOpen: function() {
//     this.openForm();
//   },
//   handleFormClose: function() {
//     this.closeForm();
//   },
//   handleFormSubmit: function(timer) {
//     this.props.onFormSubmit(timer);
//     this.closeForm();
//   },
//   openForm() {
//     this.setState({ isOpen: true });
//   },
//   closeForm() {
//     this.setState({ isOpen: false });
//   },
//   render: function() {
//     if (this.state.isOpen) {
//       return (
//         <TimerForm 
//           onFormClose={this.handleFormClose}
//           onFormSubmit={this.handleFormSubmit}
//         />
//       );
//     } else {
//       return (
//         <div className='ui basic content center aligned segment'>
//           <button
//             className='ui basic button icon'
//             onClick={this.handleFormOpen}
//           >
//             <i className='plus icon'></i>
//           </button>
//         </div> 
//       );
//     }
//   }
// });

// const EditableTimer = React.createClass({
//   getInitialState: function() {
//     return {
//       editFormOpen: false, 
//     };
//   },
//   handleEditClick: function() {
//     this.setState({ editFormOpen: true });
//   },
//   handleFormClose: function() {
//     this.setState({ editFormOpen: false });
//   },
//   handleFormSubmit: function(attrs) {
//     this.props.onFormSubmit(attrs);
//     this.setState({ editFormOpen: false });
//   },
//   render: function() {
//     if (this.state.editFormOpen) {
//       return (
//         <TimerForm
//           id={this.props.id}
//           title={this.props.title}
//           project={this.props.project}
//           onFormClose={this.handleFormClose}
//           onFormSubmit={this.handleFormSubmit}
//         />
//       );
//     } else {
//       return (
//         <Timer
//           id={this.props.id}
//           title={this.props.title}
//           project={this.props.project}
//           elapsed={this.props.elapsed}
//           runningSince={this.props.runningSince}
//           onTrashClick={this.props.onTrashClick}
//           onEditClick={this.handleEditClick}
//           onStopClick={this.props.onStopClick}
//           onStartClick={this.props.onStartClick}
//         />
//       );
//     }
//   },
// });

// const TimerForm = React.createClass({
//   handleSubmit: function() {
//     this.props.onFormSubmit({
//       id: this.props.id,
//       title: this.refs.title.value,
//       project: this.refs.project.value,
//     });
//   },
//   render: function() {
//     const submitText = this.props.id ? 'Update' : 'Create';

//     return (
//       <div className="ui centered card">
//         <div className="content">
//           <div className="ui form">
//             <div className="field">
//               <label>Title</label>
//               <input type="text" ref="title" defaultValue={this.props.title} />
//             </div>
//             <div className="field">
//               <label htmlFor="">Project</label>
//               <input type="text" ref="project" defaultValue={this.props.project}/>
//             </div>
//             <div className="ui two attached bottom buttons">
//               <div className="ui attached bottom basic red button" onClick={this.handleSubmit}>{submitText}</div>
//               <div className="ui attached bottom basic blue button" onClick={this.props.onFormClose}>Cancel</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// });

// const Timer = React.createClass({
//   componentDidMount() {
//     this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
//   },
//   componentWillUnmount() {
//     clearInterval(this.forceUpdateInterval);
//   },
//   handleTrashClick: function() {
//     this.props.onTrashClick(this.props.id);
//   },
//   handleStopClick: function() {
//     this.props.onStopClick(this.props.id);
//   },
//   handleStartClick: function() {
//     this.props.onStartClick(this.props.id);
//   },
//   render: function() {
//     const elapsedString = helpers.renderElapsedString(this.props.elapsed,this.props.runningSince);
//     return (
//       <div className="ui centered card">
//         <div className="content">
//           <div className="header">{this.props.title}</div>
//           <div className="meta">{this.props.project}</div>
//           <div className="center aligned description"><h2>{elapsedString}</h2></div>
//           <div className="extra content">
//             <span className="right floated icon" onClick={this.props.onEditClick}>
//               <i className="edit icon"></i>
//             </span>
//             <span className="right floated icon" onClick={this.handleTrashClick}>
//               <i className="trash icon"></i>
//             </span>
//           </div>
//         </div>
//         <TimerActionButton 
//           timerIsRunning={!!this.props.runningSince}
//           onStopClick={this.handleStopClick}
//           onStartClick={this.handleStartClick}
//         />
//       </div>
//     );
//   }
// });

// const TimerActionButton = React.createClass({
//   render: function() {
//     if (this.props.timerIsRunning) {
//       return (
//         <div className="ui attached bottom basic red button" onClick={this.props.onStopClick}>Stop</div>
//       );
//     } else {
//       return (
//         <div className="ui attached bottom basic green button" onClick={this.props.onStartClick}>Start</div>
//       );
//     }
//   }
// });
// ReactDOM.render( <TimersDashboard />, document.getElementById('content'));


const TimersDashboard = React.createClass({
  getInitialState: function() {
    return {
      timers: [],
    };
  },
  componentDidMount: function() {
    this.loadTimersFromServer();
    setInterval(this.loadTimersFromServer, 5000);
  },
  loadTimersFromServer: function(serverTimers) {
    client.getTimers((serverTimers) => {
      this.setState({ timers: serverTimers })
    });
  },
  handleCreateFormSubmit: function(timer) {
    this.createTimer(timer);
  },
  handleTrashClick: function(timerId) {
    this.deleteTimer(timerId);
  },
  handleEditFormSubmit: function(attrs) {
    this.updateTimer(attrs);
  },
  handleStopClick: function(timerId) {
    this.stopTimer(timerId);
  },
  handleStartClick: function(timerId) {
    this.startTimer(timerId);
  },
  createTimer: function(timer) {
    const t = helpers.newTimer(timer);
    this.setState({ timers: this.state.timers.concat(t)});
  },
  deleteTimer: function(timerId) {
    this.setState({ timers: this.state.timers.filter( t => t.id !== timerId )});
  },
  updateTimer: function(attrs) {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, {
            title: attrs.title,
            project: attrs.project,
          });
        } else {
          return timer;
        }
      }),
    });
  },
  stopTimer: function(timerId) {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + (now - timer.runningSince),
            runningSince: null,
          });
        } else {
          return timer;
        }
      }),
    });
  },
  startTimer: function(timerId) {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: now,
          });
        } else {
          return timer;
        }
      }),
    });
  },
  render: function() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList
            timers={this.state.timers}
            onTrashClick={this.handleTrashClick}
            onFormSubmit={this.handleEditFormSubmit}
            onStopClick={this.handleStopClick}
            onStartClick={this.handleStartClick}
          />
          <ToggleableTimerForm
            onFormSubmit={this.handleCreateFormSubmit}
          />
        </div>
      </div>
    );
  }
});
const ToggleableTimerForm = React.createClass({
  getInitialState: function() {
    return {
      isOpen: false,
    };
  },
  handleFormOpen: function() {
    this.setState({ isOpen: true });
  },
  handleFormClose: function() {
    this.setState({ isOpen: false });
  },
  handleFormSubmit: function(timer) {
    this.setState({ isOpen: false });
    this.props.onFormSubmit(timer);
  },
  render: function() {
    if (this.state.isOpen) {
      return (
        <TimerForm
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleFormSubmit}
        />
      );
    } else {
      return (
        <div className="ui basic content center aligned segment"
        >
          <button className="ui basic button icon"
            onClick={this.handleFormOpen}
          ><i className="plus icon"></i></button>
        </div>
      );
    }
  }
});

const EditableTimerList = React.createClass({
  render: function() {
    const timers = this.props.timers.map((timer) => (
      <EditableTimer 
        id={timer.id}
        key={timer.id}
        title={timer.title}
        project={timer.project}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
        onTrashClick={this.props.onTrashClick}
        onFormSubmit={this.props.onFormSubmit}
        onStopClick={this.props.onStopClick}
        onStartClick={this.props.onStartClick}
      />
    ));
    return ( <div id="timers">{timers}</div> );
  }
});
const EditableTimer = React.createClass({
  getInitialState: function() {
    return {
      editFormOpen: false,
    };
  },
  handleEditClick: function() {
    this.setState({ editFormOpen: true });
  },
  handleFormClose: function() {
    this.setState({ editFormOpen: false });
  },
  handleFormSubmit: function(attrs) {
    this.setState({ editFormOpen: false });
    this.props.onFormSubmit(attrs);
  },
  render: function() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleFormSubmit}
        />
      );
    } else {
      return (
        <Timer
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
          onTrashClick={this.props.onTrashClick}
          onEditClick={this.handleEditClick}
          onStopClick={this.props.onStopClick}
          onStartClick={this.props.onStartClick}
        />
      );
    }
  },
});
const TimerForm = React.createClass({
  handleFormSubmit: function() {
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.refs.title.value,
      project: this.refs.project.value,
    });
  },
  render: function() {
    const submitText = this.props.id ? 'Update' : 'Create';
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label>Title</label>
              <input type="text" ref="title" defaultValue={this.props.title}/>
            </div>
            <div className="field">
              <label>Project</label>
              <input type="text" ref="project" defaultValue={this.props.project} />
            </div>
            <div className="ui attached bottom two buttons">
              <button className="ui attached basic red button" onClick={this.handleFormSubmit}>{submitText}</button>
              <button className="ui attached basic blue button"
                onClick={this.props.onFormClose}
              >Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
const Timer = React.createClass({
  componentDidMount: function() {
    this.f = setInterval(() => this.forceUpdate(), 50);
  },
  componentWillUnmount: function() {
    clearInterval(this.f);
  },
  handleTrashClick: function() {
    this.props.onTrashClick(this.props.id);
  },
  handleStopClick: function() {
    this.props.onStopClick(this.props.id);
  },
  handleStartClick: function() {
    this.props.onStartClick(this.props.id);
  },
  render: function() {
    const elapsedString = helpers.renderElapsedString(this.props.elapsed, this.props.runningSince);
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="header">{this.props.title}</div>
          <div className="meta">{this.props.project}</div>
          <div className="center aligned description">
            <h2>{elapsedString}</h2>
          </div>
          <div className="extra content">
            <span className="right floated edit icon" onClick={this.props.onEditClick}>
              <i className="edit icon"></i>
            </span>
            <span className="right floated trash icon" onClick={this.handleTrashClick}>
              <i className="trash icon"></i>
            </span>
          </div>
        </div>
        <TimerActionButton
          timerIsRunning={!!this.props.runningSince}
          onStopClick={this.handleStopClick}
          onStartClick={this.handleStartClick}
        />
      </div>
    );
  }
});
const TimerActionButton = React.createClass({
  render: function() {
    if (this.props.timerIsRunning) {
      return (
        <div className="ui attached bottom basic red button"
          onClick={this.props.onStopClick}
        >Stop</div>
      );
    } else {
      return (
        <div className="ui attached bottom basic green button"
          onClick={this.props.onStartClick}
        >Start</div>
      );
    }
  }
});
ReactDOM.render( <TimersDashboard />, document.getElementById('content'));