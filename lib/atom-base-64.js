'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,
  rexp : /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{4})$/,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-base-64:toggle': () => this.toggle()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-base-64:encode': () => this.encode()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-base-64:decode': () => this.decode()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  isB64(text) {
    return this.rexp.test(text);
  },

  encode() {
    var ed = atom.workspace.getActiveTextEditor();
    if(ed !== null && typeof ed !== "undefined"){
      ed.setTextInBufferRange(ed.getSelectedBufferRange(),btoa(ed.getSelectedText()));
    }
    return false;
  },

  decode() {
    var ed = atom.workspace.getActiveTextEditor();
    if(ed !== null && typeof ed !== "undefined"){
      if(this.isB64(ed.getSelectedText())){
        ed.setTextInBufferRange(ed.getSelectedBufferRange(),atob(ed.getSelectedText()));
      }
    }
    return false;
  },

  toggle() {
    var ed = atom.workspace.getActiveTextEditor();
    if(ed !== null && typeof ed !== "undefined"){
      if(this.isB64(ed.getSelectedText())){
        this.decode();
      }else{
        this.encode();
      }
    }
    return false;
  }

};
