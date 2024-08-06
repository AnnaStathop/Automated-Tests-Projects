export const Selectors = {
  cookieBannerConfirmButton: "button[data-testid='cookieBanner-confirmButton']",
  searchSection: "div[data-testid='searchPage-searchForm']",
  originInput:
    "div[data-testid='searchForm-singleBound-origin-input'] input[type='text']",
  destinationInput:
    "div[data-testid='searchForm-singleBound-destination-input'] input[type='text']",

  searchFlightsButton: "button[data-testid='searchForm-searchFlights-button']",
  cabinClassesDropdown:
    "button[data-testid='searchForm-cabinClasses-dropdown']",
  pageDropdowns: "div[data-testid='etiDropdownOption']",
  flightTypeReturn: "label[data-testid='searchForm-return-radio-label']",
  flightTypeOneWay: "label[data-testid='searchForm-oneWay-radio-label']",
  flightTypeMultiCity: "label[data-testid='searchForm-multiStop-radio-label']",
  directFlightCheckbox: "input[data-testid='directFlight-input']",
  datePickers: {
    departureDateInput: "singleBound.departureDate-input",
    returnDateInput: "singleBound.returnDate-input",
    calendarNextMonthButton: "button[name='next-month']",
    currentMonthYearPlaceholder:
      "div[class*='rdp-month'] div[role='presentation']",
  },
  economyClassOption: "(//li[@data-testid='etiDropdownOption'])[1]",
  premiumClassOption: "(//li[@data-testid='etiDropdownOption'])[2]",
  businessClassOption: "(//li[@data-testid='etiDropdownOption'])[3]",
  firstClassOption: "(//li[@data-testid='etiDropdownOption'])[4]",
  searchResults: "div[data-testid='resultPage-searchResults']",
  flightSegments: "div[data-testid='tripDetails-segment']",
  toggleFiltersButton:
    "button[data-testid='resultPage-toggleFiltersButton-button']",
  stopsFilter: "div[data-testid='resultPage-MAX_STOPSFilter-content'] label",
  applyFiltersButton: "button[data-testid='filtersForm-applyFilters-button']",
  priceFilterTrack:
    "div[data-testid='resultPage-PRICEFilter-content'] div[data-testid='track-0']",
  airlinesFilter: "div[data-testid='resultPage-AIRLINESFilter-content'] li",
  clearAllAirlinesButton:
    "div[data-testid='resultPage-AIRLINESFilter-content'] span[role='button']",
  priceSegment: "span[data-testid='searchResults-segment-price']",
  adultValue: "div[data-testid='adults-passengers-currentValue']",
  passengersDropdown: "button[data-testid='searchForm-passengers-dropdown']",
  addAdultPassengerButton: "button[data-testid='adults-passengers-add']",
  removeAdultPassengerButton:
    "button[data-testid='adults-passengers-subtract']",
  clearFiltersButton: "button[data-testid='filtersForm-resetFilters-button']",
  sliderElement: "div[data-testid='resultPage-TRAVEL_TIMEFilter-content']",
  closeFiltersSection:
    "button[data-testid='resultPage-toggleFiltersButton-button']",
};
