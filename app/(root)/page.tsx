import TradingViewWidget from '@/components/TradingViewWidget'
import React from 'react'
import { MARKET_DATA_WIDGET_CONFIG, MARKET_OVERVIEW_WIDGET_CONFIG, TOP_STORIES_WIDGET_CONFIG } from '@/lib/constants'

const Home = () => {
    const script = "https://s3.tradingview.com/external-embedding/embed-widget-";
  return (
    <div className='flex min-h-screen home-wrapper'>
      <section className='grid w-full gap-8 home-section'>
        <div className="md:col-span-1 xl:col-span-1">
            <TradingViewWidget 
              title="Market Overview"
                scriptUrl={`${script}market-overview.js`}
                config={MARKET_OVERVIEW_WIDGET_CONFIG}
                height={600}
                className='custom-chart'
              />
        </div>

        <div className="md:col-span-1 xl:col-span-2">
            <TradingViewWidget 
            title="Stock Heat Map"
            scriptUrl={`${script}stock-heatmap.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            height={600}
            className='custom-chart'
          />
        </div>
      </section>

      <section className='grid w-full gap-8 home-section'>
        <div className=" h-full md:col-span-1 xl:col-span-1">
            <TradingViewWidget 
                scriptUrl={`${script}timeline.js`}
                config={TOP_STORIES_WIDGET_CONFIG}
                height={600}
                className='custom-chart'
              />
        </div>

        <div className="h-full md:col-span-1 xl:col-span-2">
            <TradingViewWidget 
            scriptUrl={`${script}market-quotes.js`}
            config={MARKET_DATA_WIDGET_CONFIG}
            height={600}
            className='custom-chart'
          />
        </div>
      </section>
    </div>
  )
}

export default Home
