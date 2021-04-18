# Health Visualizer
A single page web app that illustrates rates of heart failures in the US on a state-by-state basis. A map is rendered based on real, current, medical data from the Medicare API.

![Data Map](./images/health-visualizer.png?raw=true)

#### API Integration
- I established an account with [Data.Medicare.gov](https://data.medicare.gov/login) so that I can use the [*Hospital Compare* API](https://dev.socrata.com/foundry/data.medicare.gov/ukfj-tt6v) and generate an App Key.
- This App Key is stored in a config file (gitignored).

#### Data Manipulation
- The Medicare API delivers multitudes of data.
- This app narrows the datasets down to only contain the hospital's **30-Day Post-Discharge Mortality Rate** for patients who are treated at that hospital for **Heart Failure**.
  - An average number is returned for all hospitals, per state.