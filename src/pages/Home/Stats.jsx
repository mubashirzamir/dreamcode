import {useEffect, useState} from 'react'
import {Alert, Card, Skeleton} from 'antd'
import {useSearchParams} from 'react-router-dom'
import {WaterSavings} from '@/pages/Home/WaterSavings.jsx'
import SavingsService from '@/services/SavingsService.jsx'
import StatsForm from '@/pages/Home/StatsForm.jsx'
import {genericNetworkError} from '@/helpers/utils.jsx'
import LocationService from '@/services/LocationService.jsx'
import {useMessage} from '@/components/MessageProvider/MessageProvider.jsx'

const {Meta} = Card

const Stats = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const messageApi = useMessage()

    // Get initial values from URL params or set defaults
    const initialRoofArea = Number(searchParams.get('areaSqFt')) || 650
    const initialYear = Number(searchParams.get('year')) || new Date().getFullYear()
    const initialLat = searchParams.get('lat') || null
    const initialLon = searchParams.get('lon') || null
    const initialLocation = searchParams.get('location') || ''

    const [areaSqFt, setAreaSqFt] = useState(initialRoofArea)
    const [year, setYear] = useState(initialYear)
    const [location, setLocation] = useState(initialLocation)
    const [lat, setLat] = useState(initialLat)
    const [lon, setLon] = useState(initialLon)
    const [cityOptions, setCiyOptions] = useState([])
    const [savingsData, setSavingsData] = useState({})
    const [loadingSavings, setLoadingSavings] = useState(false)
    const [loadingLocation, setLoadingLocation] = useState(false)
    const [searchTimeout, setSearchTimeout] = useState(null) // To hold the timeout id

    const {
        monthlyWaterCollected,
        totalWaterCollected,
        moneySaved,
        waterCostPer1000LitrePounds,
        waterCollectedFormula
    } = savingsData

    // Compute the start and end dates for the selected year
    const startDate = `${year}-01-01`
    const currentYear = new Date().getFullYear()
    let endDate
    if (year === currentYear) {
        endDate = new Date().toISOString().split('T')[0] // Today's date if it's the current year
    } else {
        endDate = `${year}-12-31` // End of the selected year (December 31st)
    }

    // Fetch savings data
    const fetchWaterSavingsData = (latitude, longitude) => {
        if (!latitude || !longitude) return

        setLoadingSavings(true)
        SavingsService.waterSavings({latitude, longitude, startDate, endDate, areaSqFt})
            .then(setSavingsData)
            .catch((e) => genericNetworkError(messageApi, e))
            .finally(() => setLoadingSavings(false))
    }

    // Sync state with search params whenever any key values change
    useEffect(() => {
        setSearchParams({
            areaSqFt,
            year,
            location,
            lat,
            lon,
        })
    }, [areaSqFt, year, location, lat, lon])

    useEffect(() => {
        if (areaSqFt && lat && lon && year) {
            fetchWaterSavingsData(lat, lon)
        }
    }, [areaSqFt, lat, lon, year])

    // Fetch location if lat/lon is not set
    useEffect(() => {
        if (!lat || !lon) {
            setLoadingLocation(true)

            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const {latitude, longitude} = position.coords

                        LocationService.reverseLocationSearch({lat: latitude, lon: longitude, format: 'json'})
                            .then((data) => {
                                const detectedLocation =
                                    data.address?.city || data.address?.town || data.address?.village || 'Unknown Location'
                                setLocation(detectedLocation)
                                setLat(latitude)
                                setLon(longitude)
                            })
                            .catch((e) => genericNetworkError(messageApi, e))
                            .finally(() => setLoadingLocation(false))
                    },
                    (error) => {
                        console.error('Error getting location:', error)
                        setLoadingLocation(false)
                    }
                )
            } else {
                setLoadingLocation(false)
            }
        }
    }, [])

    const handleSearch = async (value) => {
        if (!value) {
            setCiyOptions([])
            return
        }

        LocationService.locationSearch({q: value, format: 'json'})
            .then((data) => {
                const cities = data.map((item) => ({
                    value: item.display_name,
                    label: item.display_name,
                    lat: item.lat,
                    lon: item.lon,
                }))
                setCiyOptions(cities)
            })
            .catch((e) => genericNetworkError(messageApi, e))
    }

    const debouncedSearch = (value) => {
        if (searchTimeout) {
            clearTimeout(searchTimeout) // Clear the previous timeout
        }

        const timeout = setTimeout(() => handleSearch(value), 500) // Set a new timeout to call handleSearch after 500ms
        setSearchTimeout(timeout) // Store the timeout id
    }

    const handleCitySelect = (city) => {
        const selectedCity = cityOptions.find((option) => option.value === city)
        if (selectedCity) {
            setLocation(city)
            setLat(selectedCity.lat)
            setLon(selectedCity.lon)
            fetchWaterSavingsData(selectedCity.lat, selectedCity.lon)
        }
    }

    const handleAreaSqFtChange = (value) => {
        setAreaSqFt(value)
        setSearchParams({areaSqFt: value, year, location, lat, lon})
    }

    return (
        <div className="space-y-4">
            <div>
                <Alert
                    message={<div className="font-semibold">Rainwater Harvesting</div>}
                    description="Enter the area of your roof, the year, and the location to calculate the potential rainwater harvest."
                    type="success"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <Skeleton loading={loadingSavings} active>
                        <Meta
                            title={`£${moneySaved || 0}`}
                            description={
                                <div>
                                    <div>
                                        Potential Money Saved £{waterCostPer1000LitrePounds}/1000L
                                    </div>
                                    <div>
                                        {`£${waterCostPer1000LitrePounds}/1000L`}
                                    </div>
                                </div>
                            }
                        />
                    </Skeleton>
                </Card>
                <Card>
                    <Skeleton loading={loadingSavings} active>
                        <Meta
                            title={`${totalWaterCollected || 0} Liters`}
                            description={
                                <div>
                                    <div>
                                        Potential Water Collected
                                    </div>
                                    <div>
                                        {waterCollectedFormula}
                                    </div>
                                </div>
                            }
                        />
                    </Skeleton>
                </Card>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                    <Skeleton loading={loadingSavings} active>
                        <WaterSavings monthlyWaterCollected={monthlyWaterCollected}/>
                    </Skeleton>
                </Card>
                <StatsForm
                    areaSqFt={areaSqFt}
                    setAreaSqFt={handleAreaSqFtChange}
                    location={location}
                    setLocation={setLocation}
                    year={year}
                    setYear={setYear}
                    cityOptions={cityOptions}
                    debouncedSearch={debouncedSearch}
                    onCitySelect={handleCitySelect}
                    loading={loadingLocation || loadingSavings}
                />
            </div>
            <div>
                <Alert
                    description={
                        <div>
                            <div className="mb-4">
                                <span className="text-xl font-semibold">Data Sources</span>
                            </div>
                            <ul className="mb-2">
                                <li>
                                    Rainfall: <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open
                                    Meteo</a>
                                </li>
                                <li>
                                    Water Cost: <a href="https://www.nwl.co.uk/tariffsandcharges" target="_blank"
                                                   rel="noreferrer">Northumbrian Living Water</a>
                                </li>
                            </ul>
                            <div className="mt-4">
                                <div className="mb-2">
                                    <span className="text-xl font-semibold">Source Code</span>
                                </div>
                                <ul>
                                    <li>
                                        <a href="https://github.com/mubashirzamir/dreamcode" target="_blank"
                                           rel="noreferrer">Frontend</a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/mubashirzamir/open-mateo-wrapper" target="_blank"
                                           rel="noreferrer">Backend</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                    type="info"
                />
            </div>
        </div>
    )
}

export default Stats