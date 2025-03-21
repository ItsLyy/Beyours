import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CommunityLayout from "@/Layouts/CommunityLayout";
import { Head } from "@inertiajs/react";
import {
  Document,
  Font,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const Index = ({ character, attendances, attendancesv2 }) => {
  console.log(attendancesv2);
  return (
    <>
      <Head title="Report" />

      <section className="flex flex-col h-screen w-full">
        <div className="w-full h-full">
          <PDFViewer className="w-full h-full">
            <ReportDocument
              attendances={attendances.data}
              character={character}
            />
          </PDFViewer>
        </div>
      </section>
    </>
  );
};

// const ReportDocument = ({ character, attendances }) => {
//   return (
//     <Document
//       title="report-attendance"
//       creator={character.data.fullname}
//       producer={character.data.fullname}
//     >
//       {attendances.map((attendance) => {
//         return attendance.characters.map((character) => {
//           if (character.attendances) {
//             return (
//               <Page key={attendance.id} size="A4">
//                 <View style={styles.tableHead}>
//                   <View style={styles.tableHeadRow}>
//                     <Text style={styles.tableHeadTitle}>
//                       Nama Peserta Didik
//                     </Text>
//                     <Text style={styles.tableHeadValue}>: ...</Text>
//                   </View>
//                   <View style={styles.tableHeadRow}>
//                     <Text style={styles.tableHeadTitle}>
//                       Dunia Kerja Tempat PKL
//                     </Text>
//                     <Text style={styles.tableHeadValue}>: ...</Text>
//                   </View>
//                   <View style={styles.tableHeadRow}>
//                     <Text style={styles.tableHeadTitle}>Nama Instruktur</Text>
//                     <Text style={styles.tableHeadValue}>: ...</Text>
//                   </View>
//                   <View style={styles.tableHeadRow}>
//                     <Text style={styles.tableHeadTitle}>
//                       Nama Guru Mapel PKL
//                     </Text>
//                     <Text style={styles.tableHeadValue}>: ...</Text>
//                   </View>
//                 </View>
//                 <View style={styles.tableContent}>
//                   <View style={styles.tableRow}>
//                     <View style={styles.tableHeader1}>
//                       <Text style={styles.tableTextTitle}>No.</Text>
//                     </View>
//                     <View style={styles.tableHeader2}>
//                       <Text style={styles.tableTextTitle}>Hari/Tanggal</Text>
//                     </View>
//                     <View style={styles.tableHeader3}>
//                       <Text style={styles.tableTextTitle}>
//                         Unit Kerja/Pekerjaan
//                       </Text>
//                     </View>
//                     <View style={styles.tableHeader4}>
//                       <Text style={styles.tableTextTitle}>Catatan</Text>
//                     </View>
//                   </View>
//                   <View style={styles.tableRow}>
//                     <View style={styles.tableColumn1}>
//                       <Text style={styles.tableText}>1</Text>
//                     </View>
//                     <View style={styles.tableColumn2}>
//                       <Text style={styles.tableText}>ww</Text>
//                     </View>
//                     <View style={styles.tableColumn3}>
//                       <Text style={styles.tableText}>jwdahjwak</Text>
//                     </View>
//                     <View style={styles.tableColumn4}>
//                       <Text style={styles.tableText}>
//                         isofjesifosidwa dwad awda dwa
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//                 <Text
//                   style={styles.pageNumber}
//                   render={({ pageNumber, totalPages }) =>
//                     `${pageNumber} / ${totalPages}`
//                   }
//                   fixed
//                 />
//               </Page>
//             );
//           }
//         });
//       })}
//     </Document>
//   );
// };

const ReportDocument = ({ character, attendances }) => {
  return (
    <Document
      title="report-attendance"
      creator={character.data.fullname}
      producer={character.data.fullname}
    >
      {attendances.map((attendance) => {
        return attendance.characters.map((character) => {
          if (character.attendances) {
            return (
              <Page key={attendance.id} size="A4">
                <View style={styles.container}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={
                        "/" + character.attendances.pivot.first_photo_path || ""
                      }
                    />
                    <Image
                      style={styles.image}
                      source={
                        "/" + character.attendances.pivot.second_photo_path ||
                        ""
                      }
                    />
                  </View>
                  <View style={styles.content}>
                    <Text style={styles.date}># {attendance.created_at}</Text>
                    <View style={styles.profile}>
                      <Image
                        style={styles.photoProfile}
                        src={"/" + character.photo_profile}
                      />
                      <View>
                        <Text style={styles.nameProfile}>
                          {character.fullname}
                        </Text>
                        <Text style={styles.subProfile}>
                          {character.email} | {character.phone_number} |{" "}
                          {character.address}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.informationContainer}>
                      <Text style={styles.title}>Status: </Text>
                      <Text style={styles.value}>
                        {character.attendances.pivot.status || ""}
                      </Text>
                      <Text style={styles.title}>Journal: </Text>
                      <Text style={styles.value}>
                        {character.attendances.pivot.journal ||
                          "wduadhiaudwhaudhwuiduasudi"}
                      </Text>
                      <Text style={styles.title}>First Attendance: </Text>
                      <Text style={styles.value}>
                        {character.attendances.pivot.first_attendance_time ||
                          ""}
                      </Text>
                      <Text style={styles.title}>Second Attendance: </Text>
                      <Text style={styles.value}>
                        {character.attendances.pivot.second_attendance_time ||
                          ""}
                      </Text>
                      <Text style={styles.title}>PKL:</Text>
                      <Text style={styles.value}>PT. Tilikgram</Text>
                    </View>
                  </View>
                </View>
                <Text
                  style={styles.pageNumber}
                  render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                  }
                  fixed
                />
              </Page>
            );
          }
        });
      })}
    </Document>
  );
};

Font.register({
  family: "Roboto",
  src: "http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
});

const styles = StyleSheet.create({
  content: {
    paddingTop: 125,
    paddingBottom: 65,
    paddingHorizontal: 15,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  informationContainer: {
    paddingHorizontal: 4,
    paddingVertical: 10,
  },
  date: {
    fontSize: 14,
    fontFamily: "Roboto",
    textAlign: "right",
    marginBottom: 20,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
    borderBottom: 1,
    borderBottomColor: "#cecece",
    padding: 10,
  },
  photoProfile: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center",
  },
  nameProfile: {
    fontSize: 18,
    fontFamily: "Roboto",
  },
  subProfile: {
    fontSize: 10,
    color: "grey",
    fontFamily: "Roboto",
  },
  title: {
    fontSize: 12,
    color: "grey",
    fontFamily: "Roboto",
  },
  value: {
    fontSize: 18,
    fontFamily: "Roboto",
    marginBottom: 15,
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "grey",
  },
  image: {
    aspectRatio: 3 / 4,
    width: 180,
    objectFit: "cover",
    objectPosition: "center",
    backgroundColor: "grey",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  tableContent: {
    width: "100%",
    padding: 18,
  },
  tableHeader1: {
    border: 1,
    borderColor: "black",
    padding: 4,
    width: "8%",
    textAlign: "center",
  },
  tableHeader2: {
    border: 1,
    borderColor: "black",
    padding: 4,
    width: "22%",
  },
  tableHeader3: {
    border: 1,
    borderColor: "black",
    padding: 4,
    width: "40%",
  },
  tableHeader4: {
    border: 1,
    borderColor: "black",
    padding: 4,
    width: "30%",
  },
  tableColumn1: {
    border: 1,
    borderColor: "black",
    padding: 4,
    width: "8%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
  },
  tableColumn2: {
    border: 1,
    borderColor: "black",
    padding: 4,
    width: "22%",
  },
  tableColumn3: {
    border: 1,
    borderColor: "black",
    padding: 4,
    width: "40%",
  },
  tableColumn4: {
    border: 1,
    borderColor: "black",
    padding: 4,
    width: "30%",
  },
  tableTextTitle: {
    width: "100%",
    fontSize: 14,
  },
  tableText: {
    width: "100%",
    fontSize: 12,
    height: "auto",
  },
  tableHead: {
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  tableHeadRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableHeadTitle: {
    flexGrow: 1,
    fontSize: 12,
  },
  tableHeadValue: {
    width: "70%",
    fontSize: 12,
  },
});

Index.layout = (page) => {
  return (
    <AuthenticatedLayout isMain={false}>
      <CommunityLayout
        community={page.props.community}
        character={page.props.character.data}
      >
        {page}
      </CommunityLayout>
    </AuthenticatedLayout>
  );
};

export default Index;
