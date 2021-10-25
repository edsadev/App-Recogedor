import React from "react"

import { Text, Platform, StyleSheet, SafeAreaView, ScrollView, StatusBar } from "react-native"

const TerminosCondiciones = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      {Platform.OS !== 'ios' &&
        <Text style={{fontSize: 24, padding: 20}}>Términos y condiciones</Text>
      }
      <ScrollView>
        <Text style={styles.parrafo}>Los Términos y Condiciones, también denominados como Condiciones Generales de Uso, son un documento diseñado para aquellas personas que van a crear o administrar una página o sitio web, en el cual se establecen las condiciones bajo las cuales los usuarios ingresarán y harán uso del sitio web.</Text>
        <Text style={styles.parrafo}>El documento se encuentra diseñado para sitios que sean operados o manejados por personas o empresas que tengan su domicilio en la República Mexicana o que estén destinados a personas que habitan en este país, no obstante, su contenido hace referencia a disposiciones civiles comunes en la mayoría de los países del mundo.</Text>
        <Text style={styles.parrafo}>Este documento es utilizado para regular las condiciones y reglas a las que se someten tanto los usuarios de un sitio web como su propietario y/o administrador, en lo referente al acceso y utilización del sitio web. De igual manera, hace referencia a las políticas de privacidad, protección de datos personales, enlaces, etc., que se tomarán para proteger la privacidad de los usuarios.</Text>
        <Text style={styles.parrafo}>Dichas reglas y principios aportan un mayor nivel de confianza y seguridad jurídica a los usuarios del sitio web así como a sus propietarios y/o administradores, puesto que también se establece el tipo de personas a las que va dirigido y las responsabilidades que estos adquieren al hacer uso del sitio o de los servicios que en él son ofrecidos.</Text>
        <Text style={styles.parrafo}>Existe además otro documento conocido generalmente como “Condiciones Generales de Venta” que se utiliza para regular la adquisición de productos o servicios a través de internet, no obstante, este último no debe ser confundido con el presente documento, puesto que el presente solo se limita a regular el acceso, funcionamiento e interacción del usuario con el sitio web, sin que se incluya las condiciones bajo las cuales se formalizará la adquisición de productos o servicios que tengan un costo o que requieran una licencia; y que se puedan obtener o adquirir a través del mismo sitio web.</Text>

        <Text style={styles.parrafo}>¿Cómo utilizar este documento?</Text>

        <Text style={styles.parrafo}>El modelo incluye diversos supuestos que se pueden presentar con relación a los contenidos, productos y/o servicios se encuentren disponibles dentro del sitio, y se adapta en función de las necesidades y características del sitio web, por tanto la persona que desee utilizarlo deberá tomar en cuenta entre otras cosas, lo siguiente:</Text>

        <Text style={styles.parrafo}>El tipo de público al que se encuentra dirigido el sitio web, esto es, si es para todo tipo de público o si es solamente para mayores de edad</Text>
        <Text style={styles.parrafo}>Si el acceso al sitio web requerirá de un registro del usuario, o por el contrario se encontrará disponible para todo público sin necesidad de registro</Text>
        <Text style={styles.parrafo}>Si será necesario el pago de una contraprestación para hacer uso del sitio web, o bien este será de carácter gratuito</Text>
        <Text style={styles.parrafo}>El modelo incluye los aspectos que resultan necesarios en materia de protección de datos personales en posesión de particulares e incluso se puede especificar el Aviso de Privacidad, en caso de que este se tenga disponible a través del mismo sitio web, todo esto aporta un gran nivel de confianza y seguridad jurídica, por lo que sería recomendable que este tipo de documentos se elaboren para todos y cada uno de los sitios web que se encuentran en internet, puesto que los mismos se consideran aceptados por el usuario al hacer uso del sitio y/o acceder a sus contenidos.</Text>

        <Text style={styles.parrafo}>El documento deberá estar de disponible en la ventana principal del sitio web (usualmente desde el archivo .index), no obstante, lo recomendable es que sea accesible desde cualquier parte del sitio web, a fin de que pueda ser consultado en todo momento por el usuario.</Text>

        <Text style={styles.parrafo}>En caso de que por el tipo de contenido, productos y/o servicios que se encuentren disponibles en el sitio web, se considere necesaria la aceptación expresa del usuario de los términos y condiciones; se deberá de tomar en cuenta que el usuario debe tener la posibilidad de visualizar el documento de forma íntegra; y se debe habilitar un medio para que el usuario exprese que se encuentra de acuerdo con los mismos (usualmente a través de un formulario).</Text>


        <Text style={styles.parrafo}>Derecho aplicable</Text>

        <Text style={styles.parrafo}>Capitulo segundo de la Ley Federal de Protección de Datos Personales en Posesión de Particulares.</Text>

        <Text style={styles.parrafo}>Código Civil Federal</Text>
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

export default TerminosCondiciones