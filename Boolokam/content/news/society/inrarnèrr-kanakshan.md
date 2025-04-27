---
title: "ഇന്റര്‍നെറ്റ്‌ കണക്ഷന്‍ ഉള്ള ലാപ്ടോപ് Wifi-Hotspot ആക്കാന്‍ ഒരു എളുപ്പ വഴി"
date: 2013-12-05T11:30:38
draft: false
categories: ["Society"]
tags: ['Giancarlo Stanton', 'internet from laptop', 'laptop as wifi hotspot']
author: "boolokamtv@gmail.com"
---

<img class="alignnone size-full wp-image-128276" alt="windows-8-wifi-hotspot" src="https://cdn.boolokam.com/articles/2013/12/windows-8-wifi-hotspot.jpg" width="650" height="488" />

<strong>ആദ്യം തന്നെ നിങ്ങളുടെ ലാപ്ടോപ്പില്‍ Command Prompt -Administrator മോഡില്‍ തുറക്കുക.</strong>

<strong></strong><strong>ഇതിനായി <strong>Command Prompt </strong></strong>ഐക്കണില്‍ റൈറ്റ് ക്ലിക്ക് ചെയ്ത് <strong>Run as administrator</strong> ക്ലിക്ക് ചെയ്യുക

ഇപ്പോള്‍ ഓപ്പണ്‍ ആയ വിന്‍ഡോയില്‍ താഴെ പറയുന്ന Commands ക്രമപ്രകാരം ടൈപ്പ് ചെയ്ത് Enter ചെയ്യുക

<strong>netsh wlan show drivers</strong>

ഇപ്പോള്‍ നിങ്ങളുടെ കമ്പ്യൂട്ടറില്‍ ഉള്ള wireless network ലിസ്റ്റും Properties ഉം കാണാം ...

<strong>netsh wlan set hostednetwork mode=allow</strong>

ഇപ്പോള്‍ നിങ്ങളുടെ കമ്പ്യൂട്ടറില്‍ ഉള്ള Wifi Network Shared ആയി .....

<strong>netsh wlan set hostednetwork ssid=&lt;name&gt;</strong>

നിങ്ങളുടെ Wifi Network ന് ഒരു പേര് കൊടുക്കുക ....

<strong>netsh wlan set hostednetwork key=&lt;password&gt;</strong>

നിങ്ങളുടെ Wifi Network ന് ഒരു പാസ്സ്‌വേഡ്‌  കൊടുക്കുക ....

<strong>netsh wlan start hostednetwork</strong>

ഇപ്പോള്‍ നിങ്ങളുടെ Wifi Active ആയി....

&amp;nbsp;

ഇനി Network സ്റ്റോപ്പ്‌ ചെയ്യണമെങ്കില്‍ താഴെ കാണുന്ന കമാന്‍ഡ് ടൈപ്പ് ചെയ്യുക

<strong>netsh wlan stop hostednetwork</strong> എന്നിട്ട് Enter കീ പ്രസ്‌ ചെയ്യുക ....

ഇപ്പോള്‍ നിങ്ങളുടെ Wifi നെറ്റ്‌വര്‍ക്ക് STOP ആയിക്കയിഞ്ഞു


![ഇന്റര്‍നെറ്റ്‌ കണക്ഷന്‍ ഉള്ള ലാപ്ടോപ് Wifi-Hotspot ആക്കാന്‍ ഒരു എളുപ്പ വഴി](https://cdn.boolokam.com/articles/2013/12/windows-8-wifi-hotspot.jpg)**ആദ്യം തന്നെ നിങ്ങളുടെ ലാപ്ടോപ്പില്‍ Command Prompt -Administrator മോഡില്‍ തുറക്കുക.** ******ഇതിനായി**Command Prompt**** ഐക്കണില്‍ റൈറ്റ് ക്ലിക്ക് ചെയ്ത് **Run as administrator** ക്ലിക്ക് ചെയ്യുക ഇപ്പോള്‍ ഓപ്പണ്‍ ആയ വിന്‍ഡോയില്‍ താഴെ പറയുന്ന Commands ക്രമപ്രകാരം ടൈപ്പ് ചെയ്ത് Enter ചെയ്യുക **netsh wlan show drivers** ഇപ്പോള്‍ നിങ്ങളുടെ കമ്പ്യൂട്ടറില്‍ ഉള്ള wireless network ലിസ്റ്റും Properties ഉം കാണാം ... **netsh wlan set hostednetwork mode=allow** ഇപ്പോള്‍ നിങ്ങളുടെ കമ്പ്യൂട്ടറില്‍ ഉള്ള Wifi Network Shared ആയി ..... **netsh wlan set hostednetwork ssid= <name>** നിങ്ങളുടെ Wifi Network ന് ഒരു പേര് കൊടുക്കുക .... **netsh wlan set hostednetwork key= <password>** നിങ്ങളുടെ Wifi Network ന് ഒരു പാസ്സ്‌വേഡ്‌ കൊടുക്കുക .... **netsh wlan start hostednetwork** ഇപ്പോള്‍ നിങ്ങളുടെ Wifi Active ആയി.... &nbsp; ഇനി Network സ്റ്റോപ്പ്‌ ചെയ്യണമെങ്കില്‍ താഴെ കാണുന്ന കമാന്‍ഡ് ടൈപ്പ് ചെയ്യുക **netsh wlan stop hostednetwork** എന്നിട്ട് Enter കീ പ്രസ്‌ ചെയ്യുക .... ഇപ്പോള്‍ നിങ്ങളുടെ Wifi നെറ്റ്‌വര്‍ക്ക് STOP ആയിക്കയിഞ്ഞു
