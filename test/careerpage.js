const { By, Key, until } = require("selenium-webdriver");

class careerPage {
    constructor(driver) {
        this.driver = driver;
    }

    // Verify elements in careers page
    async navigateToCareer() {
        await this.driver.get("https://theforest.ai/careers");
    }

    async waitForPageToLoadCareer(timeout = 30000) {
        await this.driver.wait(async () => {
            const currentUrl = await this.driver.getCurrentUrl();
            return currentUrl === 'https://theforest.ai/careers';
        }, timeout);
    }

    async getHeaderText() {
        const headers = await this.driver.findElements(By.xpath('//h2'));
    
        const headerTexts = await Promise.all(headers.map(async (header) => {
            return await header.getText();
        }));

        return headerTexts;
    }

    async whatWeOffer() {
        const offers = await this.driver.findElements(By.xpath('//div[@class="flex flex-col items-center gap-2 p-2 xl:p-6"]/span'));
    
        const offerTexts = await Promise.all(offers.map(async (offer) => {
            return await offer.getText();
        }));

        return offerTexts;
    }

    // Navbar section
    async clickNavbarLogo() {
        const navbarLogo = await this.driver.findElement(By.xpath('//nav/div/div/a/img[@src="/images/navbar/forestLogo.svg"]'));
        await navbarLogo.click();
    }

    async waitForPageToLoadHome(timeout = 30000) {
        await this.driver.wait(async () => {
            const currentUrl = await this.driver.getCurrentUrl();
            return currentUrl === 'https://theforest.ai/';
        }, timeout);
    }

    async clickAboutUs() {
        const aboutUs = await this.driver.findElement(By.xpath('//p[text()="About Us"]'));
        await aboutUs.click();
    }

    async waitForPageToLoadAboutUs(timeout = 30000) {
        await this.driver.wait(async () => {
            const currentUrl = await this.driver.getCurrentUrl();
            return currentUrl === 'https://theforest.ai/about-us';
        }, timeout);
    }

    async hoverServices() {
        const services = await this.driver.findElement(By.xpath('//nav/div/div/div/div/div/div/div/span[text()="Services"]'));
        await this.driver.actions().move({origin: services}).perform();
    }

    async scrolltoAvailableVacancies() {
        const available = await this.driver.findElement(By.xpath('//h2/span[text()="Available"]'));
        await this.driver.executeScript('arguments[0].scrollIntoView({ behavior: "smooth", block: "center" });', available);
    }

    async clickForestText() {
        const forestText = await this.driver.wait(until.elementLocated(By.xpath('//span[text()="Forest Technologies © 2023 All Rights Reserved."]')), 10000);
        forestText.click();
    }

    //Footer Section
    async getFooterText() {
        const footers = await this.driver.findElements(By.xpath('//span[@class="text-xl leading-8 text-cyprus font-semibold"]'));
    
        const footerTexts = await Promise.all(footers.map(async (footer) => {
            return await footer.getText();
        }));

        return footerTexts;
    }

}

module.exports = careerPage;