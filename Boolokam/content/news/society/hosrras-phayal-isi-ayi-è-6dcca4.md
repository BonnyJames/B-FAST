---
title: "ഹോസ്റ്റസ് ഫയല്‍ ഈസി ആയി എഡിറ്റ്‌ ചെയ്യാം"
date: 2012-08-23T04:50:22
draft: false
categories: ["Society"]
tags: ['Giancarlo Stanton']
author: "Beaumaris"
---

<p style="text-align: center;"><img class="aligncenter  wp-image-59880" title="windows-server" src="https://cdn.boolokam.com/articles/2012/08/windows-server.png" alt="" width="486" height="400" /></p>
വിന്‍ഡോസിലെ ഹോസ്റ്റസ് ഫയല്‍ എങ്ങനെ ആണ് ഈസി എഡിറ്റ് ചെയ്യുന്നത് എന്നാണ് ഞാന്‍ ഇവിടെ വിവരിക്കുന്നത്.

ആദ്യമായി നമ്മുടെ കമ്പ്യൂട്ടറിന്റെ മൈ കമ്പ്യൂട്ടര്‍ (my comuter) എന്ന ഫോള്‍ഡര്‍ ഓപ്പണ്‍ ചെയ്തു അതില്‍ ലോക്കല്‍ ഡിസ്‌ക് സി (local disc (c:)) എന്ന ഫോള്‍ഡര്‍ ഓപ്പണ്‍ ചെയ്യുക.

<img src="http://2.bp.blogspot.com/-JiWnvNlDnuM/UB65CafB8kI/AAAAAAAAA0g/s0SHbTN10t0/s320/screen+1.JPG" alt="" width="320" height="106" border="0" />

അതില്‍ നിന്നും വിന്‍ഡോസ്‌ (windows )എന്ന ഫോള്‍ഡര്‍ ഓപ്പണ്‍ ചെയ്യുക ,

<img src="http://4.bp.blogspot.com/-y2scEuU7fp0/UB65CrHivhI/AAAAAAAAA0k/ySrCA42RQS0/s320/screen+2.JPG" alt="" width="320" height="144" border="0" />

അതില്‍ നിന്നും സിസ്റ്റം32 (system32) എന്ന ഫോള്‍ഡര്‍ ഓപ്പണ്‍ ചെയ്യുക ,

<img src="http://3.bp.blogspot.com/-sKYUrQUIXs4/UB65CmwoHdI/AAAAAAAAA0o/ekc6OaTW5r8/s320/screen+3.JPG" alt="" width="320" height="165" border="0" />

അതില്‍ നിന്നും ഡ്രൈവേര്‍സ് (drivers) എന്ന ഫോള്‍ഡര്‍ ഓപ്പണ്‍ ചെയ്യുക ,

<img src="http://3.bp.blogspot.com/-sFGJLGiF46k/UB65DJ4LgII/AAAAAAAAA0s/OdoWlyQX4Ro/s1600/screen+4.JPG" alt="" border="0" />

അതില്‍ നിന്നും ഇടിസി (etc) എന്ന ഫോള്‍ഡര്‍ ഓപ്പണ്‍ ചെയ്യുക

<img src="http://4.bp.blogspot.com/-PkAkle3GgPQ/UB65DUGGfTI/AAAAAAAAA0w/GH8Y4rDGUz0/s320/screen+5.JPG" alt="" width="320" height="92" border="0" />

ഓപ്പണ്‍ ചെയ്യുമ്പോള്‍ നമുക്കതിനെ ഇങ്ങനെ കാണാം

<img src="http://3.bp.blogspot.com/-eG7tqduCLy8/UB65DlEvRyI/AAAAAAAAA1A/gByEgh4KDYw/s320/screen+6.JPG" alt="" width="320" height="73" border="0" />

ഈ ഫോള്‍ഡരില്‍  കാണുന്ന ഹോസ്റ്റസ് (hosts) എന്ന ഫയലിനെ കോപ്പി ചെയ്യുക, അതിനു ശേഷം ഡെസ്ക്ടോപിലെക് പേസ്റ്റ് ചെയ്യുക , എന്നിട്ട് ആ ഫയലിനെ ഓപ്പണ്‍ ചെയ്യുക, ഓപ്പണ്‍ ചെയ്യാന്‍ നോട്ട്പാഡ് (notpad) ഉപയോഗിക്കുക.

<img src="http://3.bp.blogspot.com/-sJcXHM7FzsI/UB666tkszeI/AAAAAAAAA1Q/PnwcMPcucSE/s400/screen+7.JPG" alt="" width="400" height="202" border="0" />

ഇനി നമുക്ക് ഇതിനെ എഡിറ്റ്‌ ചെയ്യാന്‍ തുടങ്ങാം,

#::1 localhost എന്ന വരിക്ക് താഴെ മുതല്‍ ആണ് എഡിറ്റ്‌ തുടങ്ങേണ്ടത്

നിങ്ങളുടെ കയ്യില്‍ ഹോസ്റ്റില്‍ ബ്ലോക്ക്‌ ചെയ്യേണ്ട വെബ്‌ സൈറ്റുകളുടെ അഡ്രസ്‌ ഉണ്ടെങ്കില്‍ അത് ഇവിടെ നമുക്ക് ടൈപ്പ് ചെയ്യാം, ഉദാഹരണമായി www.******.com നിങ്ങള്‍ക്ക് ബ്ലോക്ക്‌ ചെയ്യണം എന്നാണെങ്കില്‍  127.0.0.1 എന്ന് ടൈപ്പ് ചെയ്ത് സ്പേസ് ഇട്ടു സൈറ്റ് അഡ്രസ്‌ ടൈപ്പ് ചെയ്യുക.

<img src="http://2.bp.blogspot.com/-PhBoaazPLsA/UB_2hHUGgAI/AAAAAAAAA1k/w0REWQwwBIw/s320/screen+8.JPG" alt="" width="320" height="183" border="0" />

നിങ്ങളുടെ കയ്യില്‍ ഹോസ്റ്റ് ബ്ലോക്ക്‌ ചെയ്യേണ്ട സൈറ്റുകളുടെ ഫയല്‍ ഉണ്ടെങ്കില്‍ അതിനെ ഓപ്പണ്‍ ചെയ്തു 127.0.0.1 എന്നു തുടങ്ങുന്ന ഭാഗം മുതല്‍ കോപ്പി ചെയ്തു നോട്ട്പാഡിലേക്ക് പേസ്റ്റ് ചെയ്യുക, എന്നിട്ട് അതിനെ സേവ് ചെയ്യുക .

<img src="http://3.bp.blogspot.com/-dFs6_2Xn6NE/UB_3CLdEgDI/AAAAAAAAA1s/Fm3Ji0go51Q/s320/screen+9.JPG" alt="" width="320" height="257" border="0" />

അതിനു ശേഷം സേവ് ചെയ്ത ഈ ഫയലിനെ കോപ്പി ചെയ്തു ഇടിസി (etc) എന്ന ഫോള്‍ഡറിലേക്ക് തിരിച്ച് പേസ്റ്റ് ചെയ്യുക ,

<img src="http://1.bp.blogspot.com/-zSorbMC6UyU/UB_4w8dRTjI/AAAAAAAAA10/YOs25y36eg0/s320/screen+10.jpg" alt="" width="320" height="224" border="0" />

<img src="http://4.bp.blogspot.com/-dr22C485t5k/UB_4xNFuwrI/AAAAAAAAA14/v4Ord-mdY9o/s320/screen+11.jpg" alt="" width="320" height="204" border="0" />

കോപ്പി ആന്‍ഡ്‌ റീപ്ലേസ് ( copy and replace ) അടിക്കുക ,

<img src="http://3.bp.blogspot.com/-cKoz-Hxr0Kc/UB_54bmwL0I/AAAAAAAAA2M/Fjod15ut8Js/s320/screen+13.jpg" alt="" width="307" height="320" border="0" />
കണ്ടിന്യൂ (continue) അടിക്കുക .

<img src="http://2.bp.blogspot.com/-dhNlO_YWR60/UB_4xXffyCI/AAAAAAAAA18/hVjLB85aY-s/s320/screen+12.jpg" alt="" width="320" height="159" border="0" />

ഇപ്പോള്‍ നിങ്ങളുടെ ഹോസ്റ്റസ് ഫയല്‍ എഡിറ്റിംഗ് പൂര്‍ണമായി.

http://youtu.be/hZEI_n4giJk

വീഡിയോ ഡെമോ കണ്ടു കഴിഞ്ഞല്ലോ അല്ലെ?


![ഹോസ്റ്റസ് ഫയല്‍ ഈസി ആയി എഡിറ്റ്‌ ചെയ്യാം](https://cdn.boolokam.com/articles/2012/08/windows-server.png)വിന്‍ഡോസിലെ ഹോസ്റ്റസ് ഫയല്‍ എങ്ങനെ ആണ് ഈസി എഡിറ്റ് ചെയ്യുന്നത് എന്നാണ് ഞാന്‍ ഇവിടെ വിവരിക്കുന്നത്. ആദ്യമായി നമ്മുടെ കമ്പ്യൂട്ടറിന്റെ മൈ കമ്പ്യൂട്ടര്‍ (my comuter) എന്ന ഫോള്‍ഡര്‍ ഓപ്പണ്‍ ചെയ്തു അതില്‍ ലോക്കല്‍ ഡിസ്‌ക് സി (local disc (c:)) എന്ന ഫോള്‍ഡര്‍ ഓപ്പണ്‍ ചെയ്യുക. ![](http://2.bp.blogspot.com/-JiWnvNlDnuM/UB65CafB8kI/AAAAAAAAA0g/s0SHbTN10t0/s320/screen+1.JPG) അതില്‍ നിന്നും വിന്‍ഡോസ്‌ (windows )എന്ന ഫോള്‍ഡര്‍ ഓപ്പണ്‍ ചെയ്യുക , ![](http://4.bp.blogspot.com/-y2scEuU7fp0/UB65CrHivhI/AAAAAAAAA0k/ySrCA42RQS0/s320/screen+2.JPG) അതില്‍ നിന്നും സിസ്റ്റം32 (system32) എന്ന ഫോള്‍ഡര്‍ ഓപ്പണ്‍ ചെയ്യുക , ![](http://3.bp.blogspot.com/-sKYUrQUIXs4/UB65CmwoHdI/AAAAAAAAA0o/ekc6OaTW5r8/s320/screen+3.JPG) അതില്‍ നിന്നും ഡ്രൈവേര്‍സ് (drivers) എന്ന ഫോള്‍ഡര്‍ ഓപ്പണ്‍ ചെയ്യുക , ![](http://3.bp.blogspot.com/-sFGJLGiF46k/UB65DJ4LgII/AAAAAAAAA0s/OdoWlyQX4Ro/s1600/screen+4.JPG) അതില്‍ നിന്നും ഇടിസി (etc) എന്ന ഫോള്‍ഡര്‍ ഓപ്പണ്‍ ചെയ്യുക ![](http://4.bp.blogspot.com/-PkAkle3GgPQ/UB65DUGGfTI/AAAAAAAAA0w/GH8Y4rDGUz0/s320/screen+5.JPG) ഓപ്പണ്‍ ചെയ്യുമ്പോള്‍ നമുക്കതിനെ ഇങ്ങനെ കാണാം ![](http://3.bp.blogspot.com/-eG7tqduCLy8/UB65DlEvRyI/AAAAAAAAA1A/gByEgh4KDYw/s320/screen+6.JPG) ഈ ഫോള്‍ഡരില്‍ കാണുന്ന ഹോസ്റ്റസ് (hosts) എന്ന ഫയലിനെ കോപ്പി ചെയ്യുക, അതിനു ശേഷം ഡെസ്ക്ടോപിലെക് പേസ്റ്റ് ചെയ്യുക , എന്നിട്ട് ആ ഫയലിനെ ഓപ്പണ്‍ ചെയ്യുക, ഓപ്പണ്‍ ചെയ്യാന്‍ നോട്ട്പാഡ് (notpad) ഉപയോഗിക്കുക. ![](http://3.bp.blogspot.com/-sJcXHM7FzsI/UB666tkszeI/AAAAAAAAA1Q/PnwcMPcucSE/s400/screen+7.JPG) ഇനി നമുക്ക് ഇതിനെ എഡിറ്റ്‌ ചെയ്യാന്‍ തുടങ്ങാം, #::1 localhost എന്ന വരിക്ക് താഴെ മുതല്‍ ആണ് എഡിറ്റ്‌ തുടങ്ങേണ്ടത് നിങ്ങളുടെ കയ്യില്‍ ഹോസ്റ്റില്‍ ബ്ലോക്ക്‌ ചെയ്യേണ്ട വെബ്‌ സൈറ്റുകളുടെ അഡ്രസ്‌ ഉണ്ടെങ്കില്‍ അത് ഇവിടെ നമുക്ക് ടൈപ്പ് ചെയ്യാം, ഉദാഹരണമായി www.******.com നിങ്ങള്‍ക്ക് ബ്ലോക്ക്‌ ചെയ്യണം എന്നാണെങ്കില്‍ 127.0.0.1 എന്ന് ടൈപ്പ് ചെയ്ത് സ്പേസ് ഇട്ടു സൈറ്റ് അഡ്രസ്‌ ടൈപ്പ് ചെയ്യുക. ![](http://2.bp.blogspot.com/-PhBoaazPLsA/UB_2hHUGgAI/AAAAAAAAA1k/w0REWQwwBIw/s320/screen+8.JPG) നിങ്ങളുടെ കയ്യില്‍ ഹോസ്റ്റ് ബ്ലോക്ക്‌ ചെയ്യേണ്ട സൈറ്റുകളുടെ ഫയല്‍ ഉണ്ടെങ്കില്‍ അതിനെ ഓപ്പണ്‍ ചെയ്തു 127.0.0.1 എന്നു തുടങ്ങുന്ന ഭാഗം മുതല്‍ കോപ്പി ചെയ്തു നോട്ട്പാഡിലേക്ക് പേസ്റ്റ് ചെയ്യുക, എന്നിട്ട് അതിനെ സേവ് ചെയ്യുക . ![](http://3.bp.blogspot.com/-dFs6_2Xn6NE/UB_3CLdEgDI/AAAAAAAAA1s/Fm3Ji0go51Q/s320/screen+9.JPG) അതിനു ശേഷം സേവ് ചെയ്ത ഈ ഫയലിനെ കോപ്പി ചെയ്തു ഇടിസി (etc) എന്ന ഫോള്‍ഡറിലേക്ക് തിരിച്ച് പേസ്റ്റ് ചെയ്യുക , ![](http://1.bp.blogspot.com/-zSorbMC6UyU/UB_4w8dRTjI/AAAAAAAAA10/YOs25y36eg0/s320/screen+10.jpg) ![](http://4.bp.blogspot.com/-dr22C485t5k/UB_4xNFuwrI/AAAAAAAAA14/v4Ord-mdY9o/s320/screen+11.jpg) കോപ്പി ആന്‍ഡ്‌ റീപ്ലേസ് ( copy and replace ) അടിക്കുക , ![](http://3.bp.blogspot.com/-cKoz-Hxr0Kc/UB_54bmwL0I/AAAAAAAAA2M/Fjod15ut8Js/s320/screen+13.jpg) കണ്ടിന്യൂ (continue) അടിക്കുക . ![](http://2.bp.blogspot.com/-dhNlO_YWR60/UB_4xXffyCI/AAAAAAAAA18/hVjLB85aY-s/s320/screen+12.jpg) ഇപ്പോള്‍ നിങ്ങളുടെ ഹോസ്റ്റസ് ഫയല്‍ എഡിറ്റിംഗ് പൂര്‍ണമായി. http://youtu.be/hZEI_n4giJk വീഡിയോ ഡെമോ കണ്ടു കഴിഞ്ഞല്ലോ അല്ലെ?
