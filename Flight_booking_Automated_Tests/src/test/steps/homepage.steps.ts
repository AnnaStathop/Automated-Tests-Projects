import {
  Given,
  Then,
  When,
  setDefaultTimeout,
  Before,
  After,
} from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { Selectors } from "../../utils/constants";
// import { FlightType, ClassType } from "../../utils/enums";

setDefaultTimeout(20 * 1000);

let browser: Browser;
export let page: Page;

// Run before each test scenario
Before(async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
});

// Run after each test scenario
After(async function () {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  await browser.close();
});

// Navigate on site
Given("I navigate to site", { timeout: 60 * 1000 }, async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("https://www.flightnetwork.com/");
});

// Accept recommended cookies
Given("I accept the cookies", async function () {
  const acceptCookiesButton = page.locator(Selectors.cookieBannerConfirmButton);

  await acceptCookiesButton.waitFor({ state: "visible", timeout: 5000 });
  await acceptCookiesButton.click();
});

// Ensure search fields are visible
Given("I reveal the search fields", async function () {
  await page.locator(Selectors.searchSection).isVisible();
});

// Select flight type -> return
Given("I select return flight type", async function () {
  await page.locator(Selectors.flightTypeReturn).click();
  await page.waitForTimeout(3000);
});

// Select flight type -> one - way
Given("I select one-way flight type", async function () {
  await page.locator(Selectors.flightTypeOneWay).click();
  await page.waitForTimeout(3000);
});

// Select flight type -> multi - city
Given("I select multi-city flight type", async function () {
  await page.locator(Selectors.flightTypeMultiCity).click();
  await page.waitForTimeout(3000);
});

// Set the departure city/airport
Given(
  "I set the departure airport to {string}",
  async function (departureCity) {
    await page.locator(Selectors.originInput).fill(departureCity);

    const cityOption = await page.locator(Selectors.pageDropdowns).first();
    await cityOption.waitFor({ state: "visible", timeout: 3000 });

    await cityOption.click();
    await page.waitForTimeout(3000);
  }
);

// Set the destination city/airport
Given(
  "I set the destination airport to {string}",
  async function (destinationCity) {
    await page.locator(Selectors.destinationInput).fill(destinationCity);

    const cityOption = await page.locator(Selectors.pageDropdowns).first();
    await cityOption.waitFor({ state: "visible", timeout: 3000 });

    await cityOption.click();
    await page.waitForTimeout(3000);
  }
);

// Select the number of adult passengers
Given("I select {int} adult passenger", async function (passengers: number) {
  page.locator(Selectors.passengersDropdown).click({ timeout: 100000 });

  const adultsOptionNum = <string>(
    await page.locator(Selectors.adultValue).textContent()
  );
  while (parseInt(adultsOptionNum) != passengers) {
    if (parseInt(adultsOptionNum) < passengers) {
      page.locator(Selectors.addAdultPassengerButton).click({ timeout: 5000 });
    } else {
      page
        .locator(Selectors.removeAdultPassengerButton)
        .click({ timeout: 5000 });
    }
  }
  await page.waitForTimeout(3000);
});

//Select economy class
Given("I select Economy class", async function () {
  await page.locator(Selectors.cabinClassesDropdown).click();
  await page.locator(Selectors.economyClassOption).click();
  await page.waitForTimeout(3000);
});

//Select premium class
Given("I select Premium class", async function () {
  await page.locator(Selectors.cabinClassesDropdown).click();
  await page.locator(Selectors.premiumClassOption).click();
  await page.waitForTimeout(3000);
});

//Select business class
Given("I select Business class", async function () {
  // Click on the dropdown to reveal options
  await page.locator(Selectors.cabinClassesDropdown).click();
  await page.locator(Selectors.businessClassOption).click();
  await page.waitForTimeout(3000);
});

//Select first class
Given("I select First class", async function () {
  // Click on the dropdown to reveal options
  await page.locator(Selectors.cabinClassesDropdown).click();
  await page.locator(Selectors.firstClassOption).click();
  await page.waitForTimeout(3000);
});

//Select non-stop flights from checkbox
Given("I select Nonstop flights only", async function () {
  await page.locator(Selectors.directFlightCheckbox).click();
  await page.waitForTimeout(3000);
});

// Click the search button and verify search results
When("I click on the the search for flight button", async function () {
  await page.locator(Selectors.searchFlightsButton).click();
  await page.waitForSelector(Selectors.searchResults, {
    timeout: 20000,
  });
  expect(page.url()).toContain("result");
  await page.waitForTimeout(3000);
});

// Select departure date from the date picker
Given("I select departure date from the date picker", async function () {
  const monthYear = "July 2024";
  const day = "20";

  await page.getByTestId(Selectors.datePickers.departureDateInput).click();
  while (true) {
    // Get the current month and year displayed in the calendar
    const currentMonthYear = await page
      .locator(Selectors.datePickers.currentMonthYearPlaceholder)
      .textContent();

    if (currentMonthYear?.trim() === monthYear) {
      break;
    }

    // Click the next month button to navigate to the next month to find the correct month
    await page
      .locator(Selectors.datePickers.calendarNextMonthButton)
      .click({ timeout: 3000 });
    await page.waitForTimeout(1000);
    await page.locator(`//div[text()='${day}']`).click();
    await page.waitForTimeout(3000);
  }
});

Given("I select return date from the date picker", async function () {
  const monthYear = "July 2024";
  const day = "25";

  await page.getByTestId(Selectors.datePickers.returnDateInput).click();
  while (true) {
    // Get the current month and year displayed in the calendar
    const currentMonthYear = await page
      .locator(Selectors.datePickers.currentMonthYearPlaceholder)
      .textContent();

    if (currentMonthYear?.trim() === monthYear) {
      break;
    }

    // Click the next month button to navigate to the next month
    await page
      .locator(Selectors.datePickers.calendarNextMonthButton)
      .click({ timeout: 3000 });
    await page.waitForTimeout(1000);
  }
  await page.locator(`//div[text()='${day}']`).click();
  await page.waitForTimeout(3000);
});
