Feature: Flights


Scenario: Validate successfull redirection to flights result page
  Given I navigate to site
  And I accept the cookies
  And I reveal the search fields
  And I select return flight type
  And I set the departure airport to "ATH"
  And I set the destination airport to "DXB"
  And I select departure date from the date picker
  And I select return date from the date picker
  And I select 1 adult passenger
  And I select Premium class
  And I select Nonstop flights only
  When I click on the the search for flight button
  Then I am redirected to the flight results page
  And I see the flight results for the specific filters

Scenario: Validate the number of stops filter works as expected
  Given I navigate to site
  And I accept the cookies
  And I reveal the search fields
  And I select return flight type
  And I set the departure airport to "ATH"
  And I set the destination airport to "DXB"
  And I select departure date from the date picker
  And I select return date from the date picker
  And I select 1 adult passenger
  And I select Premium class
  And I select Nonstop flights only
  When I click on the the search for flight button
  Then I am redirected to the flight results page
  And I see the flight results for the specific filters
  And I see the filters section
  And I select the flight to be nonstop from the stops filter
  When I click the button to apply the filters
  Then the flights on the result have the selected number of stops
    
Scenario: Validate filter by airline works as expected
  Given I navigate to site
  And I accept the cookies
  And I reveal the search fields
  And I select return flight type
  And I set the departure airport to "ATH"
  And I set the destination airport to "DXB"
  And I select departure date from the date picker
  And I select return date from the date picker
  And I select 1 adult passenger
  And I select Premium class
  And I select Nonstop flights only
  And I click on the the search for flight button
  And I am redirected to the flight results page
  And I see the flight results for the specific filters
  And I see the filters section
  And I unselect all the airlines from Airline filter section
  And I select "Emirates Airlines" from the airlines checkboxes
  When I click the button to apply the filters
  Then the flights shown in the results belong to the selected airline

Scenario: Validate clear filters works as expected
  Given I navigate to site
  And I accept the cookies
  And I reveal the search fields
  And I select return flight type
  And I set the departure airport to "ATH"
  And I set the destination airport to "DXB"
  And I select departure date from the date picker
  And I select return date from the date picker
  And I select 1 adult passenger
  And I select Premium class
  And I select Nonstop flights only
  When I click on the the search for flight button
  Then I am redirected to the flight results page
  And I see the flight results for the specific filters
  And I see the filters section
  And I select clear filters
  Then the flights on the result have no filters