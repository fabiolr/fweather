
### Documentantion for F Weather

This App will gather two sets of data, based on the entered ZIP code or the location provided by the web browser.

The current data, gathered from OpenWeather, and Historical Climate Data, from Wunderground.

Historical data contain the averages (High and Low) for that month in the last 30 years.

The main purpose is to show the current temperature in a contex base. A given temperature may seem hot but for a determined region, may be normal. For example, someone from Miami may find 80 degrees reasonable for a summer afternoon.

Once determined the current temperature in historical context, a humurous message is chosen randomly from a group of 10 possible situations, and displayed.


## Cases:

# During Low Temperature times of day

Case 1 - Bellow historicalLowMin   
	Oh, it’s really fucking freezing

Case 2 - Above historicalLowMin, bellow Case 3

	Its cold!!  
	
Case 3 - within 2% of historicalLowAvg
	Its Nice

Case 4 - Above case 3, bellow historicalLowMax
	
	It's kinda chilly, but not really.

Case 5 - Above historicalLowMax

	Its actually hot for this time of the day

# During High Temperature times of day

Case 6 - Bellow historicalHighMin

Its pretty cold for this time of the day  OK

Case 7 - Above historicalHighMin, Bellow case 8

	Its A bit cold for this time...  

Case 8 - within 2% of historicalHighAvg

	Its normal.

Case 9 - above Case 8, bellow historicalHighMax

	It is very hot

Case 10 - Above historicalHighMax

	Oh Really Fuckig Hot





Special Situations

Case 20
	Really hot, cold for locals
	
