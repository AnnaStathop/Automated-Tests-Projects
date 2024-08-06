import {
  Given,
  Then,
  When,
  setDefaultTimeout,
  Before,
  After,
} from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { page } from "./homepage.steps";
import { Selectors } from "../../utils/constants";

// Check if flight results are visible
Given("I see the flight results for the specific filters", async function () {
  const flightSegments = await page.locator(Selectors.flightSegments).count();
  expect(flightSegments).toBeGreaterThan(0);

  await page.waitForTimeout(1000);
});

// Check if the page URL contains "result" to confirm redirection
Then("I am redirected to the flight results page", async function () {
  expect(page.url()).toContain("result");
  await page.locator(Selectors.searchResults).isVisible();

  await page.waitForTimeout(1000);
});

// Show the filters section
Given("I see the filters section", async function () {
  await page.locator(Selectors.toggleFiltersButton).click();
  await new Promise((resolve) => setTimeout(resolve, 10000));
});

// Filter nonstop flights
Given(
  "I select the flight to be nonstop from the stops filter",
  async function () {
    await page
      .locator(Selectors.stopsFilter)
      .filter({ hasText: "Nonstop flights" })
      .click({ timeout: 10000 });

    await page.waitForTimeout(1000);
  }
);

// Show flights with any number of stops
Given(
  "I select the flight to have or not any stops from the stops filter",
  async function () {
    await page
      .locator(Selectors.stopsFilter)
      .filter({ hasText: "All" })
      .click({ timeout: 50000 });

    await page.waitForTimeout(1000);
  }
);

// Show flights with a maximum of one stop
Given(
  "I select the flight to have maximum one stop from the stops filter",
  async function () {
    await page
      .locator(Selectors.stopsFilter)
      .filter({ hasText: "Maximum one stop" })
      .click({ timeout: 50000 });

    await page.waitForTimeout(1000);
  }
);

// Apply the filters
When("I click the button to apply the filters", async function () {
  await page.locator(Selectors.applyFiltersButton).click();
});

// Check if the flights on the results have the selected number of stops
Then(
  "the flights on the result have the selected number of stops",
  async function () {
    // Find all airline segments on the page
    const airlines = await page
      .locator('div[data-testid="tripDetails-segment"]')
      .all();

    let allNonStopFlights = true;

    for (const airline of airlines) {
      const stopElement = airline
        .locator('p[data-testid="searchResults-segment-stops"]')
        .first();

      // If the stop element is missing, it means the flight is non-stop
      if ((await stopElement.count()) === 0) {
        continue;
      } else {
        allNonStopFlights = false;
        break;
      }
    }

    // If all flights are non-stop, the expectation is true
    expect(allNonStopFlights).toBeTruthy();
  }
);

//TO-DO Set the flight duration
Given(
  "I set the flight duration to be a maximum of {int}",
  async function (duration: number) {
    const slider = await page.locator(Selectors.sliderElement);
    const sliderBoundingBox = await slider.boundingBox();
    const sliderWidth = sliderBoundingBox!.width;
  }
);

// Select airline
Given(
  "I select {string} airline from the airlines",
  async function (airline: string) {
    await page
      .locator(Selectors.airlinesFilter)
      .filter({ hasText: airline })
      .click({ timeout: 1000 });

    await page.waitForTimeout(1000);
  }
);

// TO-DO Check that the flights on the results have max duration the selected
Then(
  "The flights with the result have {int} flight duration",
  async function (duration: number) {
    const flights = await page
      .locator('div[data-testid="tripDetails-segment"]')
      .all();

    for (const flight of flights) {
      const durationText = await flight
        .locator('span[data-testid="searchResults-segment-duration"]')
        .textContent();

      expect(durationText).toBeLessThanOrEqual(duration);
    }
  }
);

// Unselect all the airlines
Given(
  "I unselect all the airlines from Airline filter section",
  async function () {
    page
      .locator(Selectors.clearAllAirlinesButton)
      .filter({ hasText: "Clear all" })
      .click({ timeout: 10000 });

    await page.waitForTimeout(1000);
  }
);

// Select airline
When(
  "I select {string} from the airlines checkboxes",
  async function (airline: string) {
    await page
      .locator('div[data-testid="resultPage-AIRLINESFilter-content"] li')
      .filter({ hasText: airline })
      .click({ timeout: 10000 });
  }
);

//  Check that the flights on the results belong to the selected airline
Then(
  "the flights shown in the results belong to the selected airline",
  async function () {
    const selectedAirline = "Emirates Airlines";
    const flightSegments = await page
      .locator(Selectors.flightSegments)
      .allTextContents();

    flightSegments.forEach((airline) => {
      expect.soft(airline).toContain(selectedAirline);
    });
  }
);

// Clear all filters
Given("I select clear filters", async function () {
  page
    .locator(Selectors.clearFiltersButton)
    .filter({ hasText: "Clear" })
    .click({ timeout: 10000 });

  await page.waitForTimeout(1000);
});

// Close the filters
Then("the flights on the result have no filters", async function () {
  await page.locator(Selectors.closeFiltersSection).click({ timeout: 10000 });
  const searchResults = page.locator(Selectors.searchResults);

  expect(searchResults).toBeTruthy();
  await page.waitForTimeout(1000);
});
