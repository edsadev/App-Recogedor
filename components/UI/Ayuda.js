import React from "react"

import { Text, Platform, StyleSheet, SafeAreaView, ScrollView, StatusBar } from "react-native"

const Ayuda = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      {Platform.OS !== 'ios' &&
        <Text style={{fontSize: 24, padding: 20}}>Ayuda</Text>
      }
      <ScrollView>
        <Text style={styles.parrafo}>¿Qué características debe tener la sección de FAQ?
        La palabra FAQ corresponde a la sigla Frequently Asked Questions y se refiere al espacio destinado a responder las preguntas frecuentes que los clientes tienen sobre el producto o servicio que tu empresa ofrece. 

        Los ejemplos de FAQ que veremos aquí cumplen con algunas características y elementos que los hacen eficaces en su función:

        Reflejan las necesidades del cliente, público o consumidor.
        Cubren un abanico amplio de posibles dudas, problemas y preguntas.
        Son actualizadas con frecuencia.
        Su interfaz es intuitiva, fácil de usar y amigable.
        Redirigen hacia la información pertinente dentro de la página o aplicación. 
        Piden a los usuarios un feedback inmediato con preguntas como “¿fue útil este artículo?”. 
        Es importante que los equipos encargados monitoreen permanentemente las interacciones que los clientes con algún tipo de problema tienen con la empresa y garanticen un control de los procesos de atención. Esto permite identificar situaciones y casos comunes para agruparlos y alimentar la sección de FAQ continuamente con soluciones más actualizadas. 

        No es una práctica recomendada ofrecer respuestas aleatorias, complejas o con procedimientos difíciles de seguir de forma autónoma. 

        Tampoco se debe extender mucho la gama de soluciones, pues es posible que el cliente se irrite antes de encontrar la respuesta que busca. En esos casos, lo mejor es remitirlo para un representante o agente que lo atienda de forma personalizada. 

        ¿Cómo crear un FAQ ejemplar?
        Los  mejores ejemplos de FAQ muestran que las preguntas están estrechamente relacionadas con la capacidad de la empresa de ofrecer un autoservicio de calidad. 

        El 60% de los estadounidenses dice que para asuntos sencillos prefieren los canales de consulta que ofrecen posibilidades de autoservicio, es decir, donde ellos mismos puedan encontrar la solución de su caso sin la intervención de un agente. 

        Un estudio de Forrester asegura que la página o el espacio de preguntas frecuentes es la opción de autoservicio preferida por los clientes. 

        Entonces, si tu pregunta es cómo crear un FAQ, tu objetivo primordial será brindar  autonomía a tus clientes para atender sus solicitudes más básicas o comunes. 

        ¿Cómo lograrlo? Para conseguir que tu empresa implemente un autoservicio adaptable que ofrezca un óptimo servicio al cliente y proporcione una excelente experiencia debes seguir algunos pasos:

        Optimiza la gestión de la base de conocimientos
        La experiencia en resolución de problemas no puede quedar solo en manos de los agentes de atención al cliente, debe ser transversal a todos los funcionarios de la empresa. Esta es la base para crear un FAQ eficiente. 

        Si se aprovecha el conocimiento de los equipos, los análisis de las interacciones de los clientes y se suman herramientas tecnológicas que faciliten y optimicen el trabajo, tendremos una ecuación ganadora. 

        Por ejemplo, las preguntas frecuentes pueden ser organizadas, caracterizadas y agrupadas con base en la preferencia de los clientes, las políticas de la empresa, los detalles de los productos, entre otras características, a través de tecnología de inteligencia artificial. 

        Este tipo de recursos reduce los trabajos manuales innecesarios y evita que la misma duda llegue decenas de veces a un agente de atención. Vamos a ilustrarlo con un caso:

        Un ejemplo de pregunta frecuente en una empresa de televisión por cable puede ser: ¿por qué aparece X mensaje en mi pantalla? 

        Las causas de este problema suelen ser las mismas, entonces, imagina que el cliente toma su celular, abre su aplicación, busca esta pregunta y se encuentra varios escenarios posibles: procedimientos técnicos sencillos que puede ejecutar (como apagar y encender el modem), testar algún código en el control remoto, ver el estado de su factura, etc. 

        Piensa ahora que después de intentar con una o varias de estas opciones el cliente no consigue resolver su problema a través del FAQ. En ese caso, abre la opción de agendar una visita técnica o inclusive comunicarse con un especialista a través de un Help Desk. 

        ¿Sería una buena experiencia, cierto? Pues esto es posible con un software inteligente para gestión del conocimiento. 

        Ahora, piensa que la única opción posible, inmediatamente después de ver aquel mensaje en la pantalla, es comunicarse con un representante. Imagínate la cantidad de representantes resolviendo el mismo problema cientos de veces… sobrecarga para los funcionarios y estrés seguro para el cliente. 

        Clasifica la información
        Agrupa los contenidos por temas. Un ejemplo de FAQ para un Marketplace podría estar dividido en pagos, problemas relacionados con producto, entrega y envío, devoluciones y otros aspectos relacionados a trámites realizados dentro de la plataforma. 

        Para saber cuál es la información relevante que se debe agregar en un FAQ analiza  las necesidades y dudas comunes de los clientes. 

        Necesitas integrar la información de redes sociales, comunidades de usuarios e histórico de interacciones para tener una amplia gama de posibilidades. Claro, para esto la base de conocimientos de la empresa es fundamental.</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerIOS: {
    marginVertical: 10
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  parrafo: {
    paddingBottom: 10,
    paddingHorizontal: 20
  }
})

export default Ayuda