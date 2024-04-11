import { useLocation } from 'react-router-dom'
import { Page, Text, View, Document, PDFViewer, Image, StyleSheet, Font } from '@react-pdf/renderer'

Font.register({ family: 'Montserrat', src: '/images/exercises/39/Montserrat-Bold.ttf' })

const style = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateRows: '100%',
    gridTemplateColumns: '100%',
    justifyItems: 'center',
    alignItems: 'center'
  },
  viewHeader: {
    display: 'flex',
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewProfile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#E0E0E0',
    padding: '10px 20px',
    borderRadius: '20px'
  },
  image: {
    width: '15%',
    height: '40%',
    objectFit: 'contain'
  },
  imageHeader: {
    width: '50%',
    height: '50%',
    objectFit: 'contain',
    objectPosition: '12% 50%'
  },
  textHeader: {
    marginTop: '10px',
    color: '#008e86',
    fontWeight: 'bold',
    fontFamily: 'Montserrat'
  },
  text: {
    color: '#008e86',
    fontWeight: 'bold',
    fontFamily: 'Montserrat'
  },
  textTitle: {
    color: '#008e86',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    backgroundColor: '#E0E0E0',
    padding: '5px 20px 5px',
    borderRadius: '20px',
    margin: '10px 0px'
  },
  textSub: {
    color: '#008e86',
    fontSize: '10px'
  },
  textProfile: {
    color: '#008e86',
    fontFamily: 'Montserrat',
    width: '40%',
    fontSize: '10px',
    textAlign: 'center'
  },
  chartsRow: {
    width: '90%',
    height: '25%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    border: '3px solid #E0E0E0',
    borderRadius: '20px'
  },
  viewCharts: {
    display: 'flex',
    width: '50%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chart: {
    height: '90%',
    objectFit: 'contain',
    marginTop: '10px'
  },
  tableRowGood: {
    display: 'flex',
    width: '100%',
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#82C993',
    flexDirection: 'row'
  },
  tableRowRegular: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#EDCA71',
    flexDirection: 'row',
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableRowBad: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#F87777',
    flexDirection: 'row',
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableText: {
    color: '#424242',
    width: '30%',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: '15px'
  },
  tableContainer: {
    maxHeight: '43%',
    paddingBottom: '35px',
    width: '90%',
    border: '3px solid #E0E0E0',
    borderRadius: '20px'
  },
  tableContainerGeneric: {
    width: '90%',
    border: '3px solid #E0E0E0',
    borderRadius: '20px',
    paddingBottom: '35px'
  },
  tableHeader: {
    display: 'flex',
    width: '100%',
    height: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  tableHeaderText: {
    color: '#F97D61',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    width: '30%',
    textAlign: 'center'
  },
  badgeChartContainer: {
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    height: '25%',
    gap: '10px'
  },
  dummyContainer: {
    width: '76%',
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center'
  },
  chartsRowBadges: {
    width: '100%',
    height: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px',
    border: '3px solid #E0E0E0'
  },
  badgeContainer: {
    width: '90%',
    height: '100%',
    border: '3px solid #E0E0E0',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center'

  },
  dummyContainerAgain: {
    width: '24%',
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center'
  },
  badge: {
    objectFit: 'contain'
  },
  CardHorizontalRow__title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    color: '#008E86',
    paddingBottom: '10px'
  },
  HorizontalBarGrid: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  HorizontalBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '10px 20px',
    borderRadius: '20px'
  },
  HorizontalBar__bar: {
    width: '100%',
    height: '20px',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '20px',
    overflow: 'hidden'
  },
  HorizontalBar__label: {
    color: '#008e86',
    fontWeight: 'bold',
    fontFamily: 'Montserrat'
  },
  HorizontalBar__chart: {
    height: '90%',
    objectFit: 'contain',
    marginTop: '10px'
  },
  HorizontalBar__bar__green: {
    backgroundColor: '#82C993'
  },
  HorizontalBar__bar__yellow: {
    backgroundColor: '#EDCA71'
  },
  HorizontalBar__bar__red: {
    backgroundColor: '#F87777'
  }

})

export default function Pdf () {
  const { spiderImg, pieImg, barImg, loginUser, badges, data } = useLocation().state

  const total = data.reduce((acc, current) => acc + current.valueGreen + current.valueYellow + current.valueRed, 0)
  const myDate = new Date().toLocaleString('en-GB', { timeZone: 'America/Bogota' })

  return (
    <PDFViewer style={{ width: '100vw', height: '100vh' }}>
      <Document>
        <Page size="A4" style={style.page}>
          <View style={style.viewHeader}>
            <Image src='/images/pdf/logoEduSoul.png' style={style.imageHeader}/>
            <View style={style.viewProfile}>
              <Image src='/images/pdf/kattypdf.png' style={style.image}/>
              <View>
                <Text style={style.text}>{loginUser.name}</Text>
                <Text style={style.textSub}>{myDate}</Text>
              </View>
            </View>
          </View>
          {badges < 50
            ? <>
              <Text style={style.textTitle}>Gráficos</Text>
              <View style={style.chartsRow}>
                {spiderImg && <View style={style.viewCharts}>
                  <Image src={spiderImg} style={style.chart} />
                </View>}
                {pieImg && <View style={style.viewCharts}>
                  <Image src={pieImg} style={style.chart} />
                </View>}
                {barImg && <View style={style.viewCharts}>
                  <Image src={barImg} style={style.chart} />
                </View>}
              </View>
            </>
            : <View style={style.badgeChartContainer}>
              <View style={style.dummyContainer}>
                <Text style={style.textTitle}>Gráficos</Text>
                <View style={style.chartsRowBadges}>
                  <View style={style.viewCharts}>
                    <Text style={style.text}>Dimensiones</Text>
                    <Image src={spiderImg} style={style.chart} />
                  </View>
                  <View style={style.viewCharts}>
                    <Text style={style.text}>Apropiación</Text>
                    <Image src={pieImg} style={style.chart} />
                  </View>
                </View>
              </View>
              <View style={style.dummyContainerAgain}>
                <Text style={style.textTitle}>Insignias</Text>
                <View style={style.badgeContainer}>
                  {badges >= 50 && <Image src='/images/3.png' style={style.badge}/>}
                  {badges >= 75 && <Image src='/images/2.png' style={style.badge}/>}
                  {badges >= 100 && <Image src='/images/1.png' style={style.badge}/>}
                </View>
              </View>
            </View>
          }
          <Text style={style.textTitle}>Progreso</Text>
          <View style={style.HorizontalBarGrid}>
            {data.map((item, index) => (
              <View key={index} style={style.HorizontalBar}>
                <Text style={style.HorizontalBar__label}>{item.label}</Text>
                <View style={style.HorizontalBar__bar}>
                  <View style={[style.HorizontalBar__bar__red, { width: `${item.valueRed / (total !== 0 ? total : 1) * 100}%` }]} />
                  <View style={[style.HorizontalBar__bar__yellow, { width: `${item.valueYellow / (total != 0 ? total : 1) * 100}%` }]} />
                  <View style={[style.HorizontalBar__bar__green, { width: `${item.valueGreen / (total != 0 ? total : 1) * 100}%` }]} />
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}
