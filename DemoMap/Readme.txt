MyMap



Retrieving location detail from OpenMRS and displaying it on a map.


I set up OpenMRS locally on my Tomcat Server and i am fetching the data from 
OpenMRS from the URL  http://localhost:8081/openmrs-standalone/ws/rest/v1/location?v=full
The reponse i am getting is:

<object>
<results>
<location>
<uuid>8d6c993e-c2cc-11de-8d13-0010c6dffd0f</uuid>
<display>Unknown Location</display>
<name>Unknown Location</name>
<description/>
<address1/>
<address2/>
<cityVillage/>
<stateProvince/>
<country/>
<postalCode/>
<latitude/>
<longitude/>
<countyDistrict/>
<address3/>
<address4/>
<address5/>
<address6/>
<tags>...</tags>
<parentLocation/>
<childLocations/>
<retired>false</retired>
<auditInfo>
<creator>
<uuid>ff7e020d-9ae9-11e3-a08e-52540000811a</uuid>
<display>admin</display>
<links>
<link>
<rel>self</rel>
<uri>...</uri>
</link>
</links>
</creator>
<dateCreated>2005-09-22T00:00:00.000+0530</dateCreated>
<changedBy/>
<dateChanged/>
</auditInfo>
<attributes/>
<links>
<link>
<rel>self</rel>
<uri>...</uri>
</link>
</links>
<resourceVersion>1.9</resourceVersion>
</location>
</results>
</object>



As lat and long are NULL , i replaced my own values in the response and displayed it on map.

