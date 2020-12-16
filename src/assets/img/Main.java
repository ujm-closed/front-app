package semweb;


import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;


import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Property;

import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdfconnection.RDFConnection;
import org.apache.jena.rdfconnection.RDFConnectionFactory;

public class Main {

	public static void main(String[] args) {

	
		String stationURIPrefix = "http://www.example.com/";
		String geoURIprefix = "https://www.w3.org/2003/01/geo/wgs84_pos#";
		String rdfSchemaURIprefix = "http://www.w3.org/2000/01/rdf-schem#/";
		String rdfUriPrefix="http://www.w3.org/1999/02/22-rdf-syntax-ns#";
	
		
		Model model = ModelFactory.createDefaultModel();
		Property rdfsLabel = model.createProperty(rdfSchemaURIprefix + "label");
		Property geoLat = model.createProperty(geoURIprefix + "lat");
		Property geoLong = model.createProperty(geoURIprefix + "long");	
		Property rdfType = model.createProperty(rdfUriPrefix + "type");
		

		
	
		
		
//		https://mkyong.com/java/how-to-read-and-parse-csv-file-in-java/
		String csvFile = "H:\\SemanticWeb\\swProject\\semweb\\src\\main\\java\\semweb\\stops.txt";
        BufferedReader br = null;
        String line = "";
        String cvsSplitBy = ",";
        
        

        try {

            br = new BufferedReader(new FileReader(csvFile));
            while ((line = br.readLine()) != null) {

                // use comma as separator
                String[] stops = line.split(cvsSplitBy);
        		
                Resource resource1=model.createResource(stationURIPrefix + stops[0].replaceAll(" ", "_"));

                
                Resource spatialThing=model.createResource(geoURIprefix+"SpatialThing");

      
                model.add(resource1,rdfType,spatialThing);
                model.add(resource1,rdfsLabel,stops[1]);
                model.add(resource1,geoLat,stops[3]);
                model.add(resource1,geoLong,stops[4]);
             
                
        		
}

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } 
        
        String datasetURL = "http://localhost:3030/aninda";
		String sparqlEndpoint = datasetURL + "/sparql";
		String sparqlUpdate = datasetURL + "/update";
		String graphStore = datasetURL + "/data";
		RDFConnection conneg = RDFConnectionFactory.connect(sparqlEndpoint,sparqlUpdate,graphStore);
		conneg.load(model); // add the content of model to the triplestore
		model.write(System.out,"Turtle");

	}}