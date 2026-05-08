import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:3000/")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Navigate to /intelligence and verify the competitor intelligence view is present, then check for radar chart, comparison matrix, and live signal updates.
        await page.goto("http://localhost:3000/intelligence")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # --> Assertions to verify final state
        assert await page.locator("xpath=//*[contains(., 'Competitor Intelligence')]").nth(0).is_visible(), "The competitor intelligence content should be visible after navigating to /intelligence."
        assert await page.locator("xpath=//*[contains(., 'Competitor Radar')]").nth(0).is_visible(), "The competitor radar chart should be visible after opening the competitor intelligence view."
        assert await page.locator("xpath=//*[contains(., 'Comparison Matrix')]").nth(0).is_visible(), "The competitor comparison matrix should be visible to compare competitors side by side."
        assert await page.locator("xpath=//*[contains(., 'Live Signals')]").nth(0).is_visible(), "Live Signals should be visible to show real-time competitor updates."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    