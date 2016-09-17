"use strict";

const Nightmare = require("nightmare");
const nightmareOpt = { show:  false };  // true to debug
const nightmare = Nightmare(nightmareOpt);
const schedule = require('node-schedule');

const upassUrl = "https://upassbc.translink.ca/";
const args = process.argv.slice(2);
const user = args[0];
const password = args[1];
if(args.length != 2) {
  console.log("Usage: node index.js [username] [password]");
  return;
}

function requestUpass() {
  console.log("Begin request");
  const schoolSelectEl = "#PsiId";
  const schoolSelectVal = "ubc";
  const usernameEl = "#j_username";
  const passwordEl = "#password";
  const submitBtnEl = "form [type=submit]";
  const statusEl = "div.status";
  const requestCheckboxEl = "td div input";
  const requestButtonEl = 'input[value="Request"]';
  const logoutEl = "#logout-link";

  nightmare
    .goto(upassUrl)
    .wait()
    .select(schoolSelectEl, schoolSelectVal)
    .click(submitBtnEl)
    .wait(passwordEl)
    .type(usernameEl, user)
    .type(passwordEl, password)
    .click(submitBtnEl)
    .wait(statusEl)
    .visible(requestCheckboxEl)
    .then((hasNotRequested) => {
      if (hasNotRequested) {
        console.log("Requesting");
        nightmare
          .click(requestCheckboxEl)
          .click(requestButtonEl)
          .click(logoutEl)
          .end()
          .then(() => {
            console.log("Requested");
          });
          return;
      } 
      console.log("Already Requested Previously");
      nightmare
        .click(logoutEl)
        .end()
        .then();
    });
}

const date = new Date("2016-09-16 00:00");
const rule = new schedule.RecurrenceRule();
rule.dayOfmonth = date.getUTCDate();
rule.hour = date.getUTCHours();
rule.minute = date.getUTCMinutes() ;
rule.seconds = date.getUTCSeconds();

schedule.scheduleJob(rule, requestUpass);
