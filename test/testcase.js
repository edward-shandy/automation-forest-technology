const { Builder, By, Key, until } = require('selenium-webdriver');
const expect = require('chai').expect;

describe('regression test careers page', function(){
    it('should return a list of players with their ratings', async function() {
        let driver = await new Builder().forBrowser("chrome").build();
        try{

            await driver.manage().window().maximize();

            await driver.get("https://theforest.ai/careers");

            const names = await driver.findElements(By.className('tur'));

            for (let n of names){
                console.log(await n.getText());
            }

            headers = await driver.findElement(By.className('contentheading')).getText();
            expect(headers).to.equal('Standard Top 100 Players August 2023')

        }
        catch(err){
            console.error('error occured:', err);
        }
        finally{
            await driver.quit();
            
        }
    }).timeout(15000);
});

