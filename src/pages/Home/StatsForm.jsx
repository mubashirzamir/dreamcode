import {AutoComplete, Card, Form, Input, Select} from 'antd'

const {Option} = Select

const StatsForm = ({
                       areaSqFt,
                       setAreaSqFt,
                       location,
                       setLocation,
                       cityOptions,
                       debouncedSearch,
                       onCitySelect,
                       year,
                       setYear
                   }) => {
    const [form] = Form.useForm()

    // Generate years from current year to -5 years
    const currentYear = new Date().getFullYear()
    const years = Array.from({length: 6}, (_, i) => currentYear - i)

    return (
        <Card>
            <Form layout="vertical" form={form}>
                {/* Roof Area Input */}
                <Form.Item label="Roof Area (Square Feet)">
                    <Input
                        type="number"
                        placeholder="Square Meters"
                        value={areaSqFt}
                        onChange={(e) => setAreaSqFt(Number(e.target.value))}
                    />
                </Form.Item>

                {/* Location Input */}
                <Form.Item label="Location">
                    <AutoComplete
                        value={location}
                        options={cityOptions}
                        onSearch={debouncedSearch}
                        onChange={(newLocation) => setLocation(newLocation)}
                        onSelect={onCitySelect}
                        placeholder="Search for a UK city"
                    >
                        <Input/>
                    </AutoComplete>
                </Form.Item>

                {/* Year Selection */}
                <Form.Item label="Year">
                    <Select defaultValue={currentYear} value={year} onChange={setYear} placeholder="Select Year">
                        {years.map((y) => (
                            <Option key={y} value={y}>
                                {y}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default StatsForm
