const { Builder } = require("selenium-webdriver");
const CareerPage = require("./careerpage");
var expect = require('chai').expect

describe('careers page regression', function () {

    let driver;
    let careerPage;

    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        careerPage = new CareerPage(driver);
        await driver.manage().window().maximize();
    });
    after(async function () {
        // await driver.quit();
    });

    //Test case 1
    it('successfully direct to careers page', async function () {
    

        await careerPage.navigateToCareer();

        await careerPage.waitForPageToLoadCareer();

        const headerTexts = await careerPage.getHeaderText();
        expect(headerTexts).to.include.members([
            'Careers\nat Forest Technologies',
            'Innovate & Grow with Us',
            'Our Members Testimonials',
            'Available Vacancies'
        ]);

        const offerTexts = await careerPage.whatWeOffer();
        expect(offerTexts).to.include.members([
            'Career Growth',
            'Collaborative Environment',
            'Professional Development',
            'Remote Working',
            'Special Activities and Events',
            'Competitive Salary'
        ]);
  });

  //Test case 2
  it('successfully navigate to homepage and go back', async function () {
        await careerPage.clickNavbarLogo();

        await careerPage.waitForPageToLoadHome();

        await driver.navigate().back();

        await careerPage.waitForPageToLoadCareer();
  });

  //Test case 3
  it('successfully navigate to about us and go back', async function () {
        await careerPage.clickAboutUs();

        await careerPage.waitForPageToLoadAboutUs();

        await driver.navigate().back();

        await careerPage.waitForPageToLoadCareer();
  });

  //Test Case 4
  it('successfully hover services element', async function () {
        await careerPage.hoverServices();

    });

  //Test Case 5
  it('successfully scroll down to available vacancies and verify footer', async function () {
        await careerPage.scrolltoAvailableVacancies();

        await careerPage.clickForestText();

        const footerTexts = await careerPage.getFooterText();
        expect(footerTexts).to.include.members([
            'About',
            'Tech for Hire',
            'End-to-End Development'
        ]);

    });

});

