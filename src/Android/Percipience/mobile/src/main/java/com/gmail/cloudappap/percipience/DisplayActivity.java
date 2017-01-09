package com.gmail.cloudappap.percipience;

import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.os.SystemClock;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.ActivityCompat;
import android.util.SparseArray;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

import com.firebase.client.DataSnapshot;
import com.firebase.client.Firebase;
import com.firebase.client.FirebaseError;
import com.firebase.client.Transaction;
import com.firebase.client.ValueEventListener;
import com.google.android.gms.common.api.CommonStatusCodes;
import com.google.android.gms.vision.CameraSource;
import com.google.android.gms.vision.Detector;
import com.google.android.gms.vision.barcode.Barcode;
import com.google.android.gms.vision.barcode.BarcodeDetector;

import java.io.IOException;


/**
 * Created by jeroen.
 */

public class DisplayActivity extends AppCompatActivity {

    String currentVak;
    String currentKlas;
    String currentVraag;
    SurfaceView cameraPreview;
    String currentAwnsers = "";
    int yesVal = 0;
    int noVal = 0;
    int CVal = 0;
    int DVal = 0;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        cameraPreview = (SurfaceView) findViewById(R.id.cameraPreview);
        createCameraSource();

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        //  navigationView.setNavigationItemSelectedListener(this);


        Firebase.setAndroidContext(this);


        Firebase myFirebaseRef = new Firebase("https://percipience-ace91.firebaseio.com/");

        myFirebaseRef.child("ID_LEERKRACHT/Appsettings").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                Firebase myFirebaseRef = new Firebase("https://percipience-ace91.firebaseio.com/");
                myFirebaseRef.child("ID_LEERKRACHT/Appsettings/androidOnline").setValue("yes");

                currentKlas = snapshot.child("currentKlas").getValue().toString();


                currentVak = snapshot.child("currentVak").getValue().toString();

                currentVraag = snapshot.child("currentVraag").getValue().toString();

                currentAwnsers =  snapshot.child("currentAnswers").getValue().toString();


                System.out.println(currentKlas);
                System.out.println(currentVak);
                System.out.println(currentVraag);



                if (currentKlas == "0" || currentVak == "0" || currentVraag == "0") {
                    TextView textViewCurrentKlas = (TextView) findViewById(R.id.textViewCurrentKlas);
                    textViewCurrentKlas.setText("Start de les om te beginnen met scannen");
                    TextView textViewCurrentVak = (TextView) findViewById(R.id.textViewCurrentVak);
                    textViewCurrentVak.setText("");
                    TextView textViewCurrentVraag = (TextView) findViewById(R.id.textViewCurrentVraag);
                    textViewCurrentVraag.setText("");
                }
                else {
                    TextView textViewCurrentKlas = (TextView) findViewById(R.id.textViewCurrentKlas);
                    textViewCurrentKlas.setText(currentKlas);
                    TextView textViewCurrentVak = (TextView) findViewById(R.id.textViewCurrentVak);
                    textViewCurrentVak.setText(currentVak);
                    TextView textViewCurrentVraag = (TextView) findViewById(R.id.textViewCurrentVraag);
                    textViewCurrentVraag.setText(currentVraag);
                }
            }

            @Override
            public void onCancelled(FirebaseError error) {
                System.out.println("firebase error");
            }
        });






    }

    private void createCameraSource() {
        BarcodeDetector barcodeDetector = new BarcodeDetector.Builder(this).build();
        final CameraSource cameraSource = new CameraSource.Builder(this, barcodeDetector)
                .setAutoFocusEnabled(true)
                .setRequestedPreviewSize(1600, 1024)
                .build();
        cameraPreview.getHolder().addCallback(new SurfaceHolder.Callback() {
            @Override
            public void surfaceCreated(SurfaceHolder holder) {
                try {
                    if (ActivityCompat.checkSelfPermission(DisplayActivity.this, android.Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                        // TODO: Consider calling
                        //    ActivityCompat#requestPermissions
                        // here to request the missing permissions, and then overriding
                        //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                        //                                          int[] grantResults)
                        // to handle the case where the user grants the permission. See the documentation
                        // for ActivityCompat#requestPermissions for more details.
                        return;
                    }
                    cameraSource.start(cameraPreview.getHolder());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            @Override
            public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {

               // TextView textViewYes = (TextView) findViewById(R.id.textViewYes);
               // textViewYes.setText("Changed");
            }

            @Override
            public void surfaceDestroyed(SurfaceHolder holder) {
                cameraSource.stop();
            }
        });
        barcodeDetector.setProcessor(new Detector.Processor<Barcode>() {
            @Override
            public void release() {

            }

            @Override
            public void receiveDetections(Detector.Detections<Barcode> detections) {
                final SparseArray<Barcode> barcodes = detections.getDetectedItems();
              //  if (barcodes.size()>0) {


                    for(int i = 0; i < barcodes.size(); i++) {
                        System.out.println("detected bar");
                        Barcode test = barcodes.valueAt(i);
                        if (currentAwnsers.contains(test.displayValue)) {

                            System.out.println("ignoring old value..");

                        }
                        else {
                           // currentAwnsers += test.displayValue;
                    //        System.out.println("current: " + currentAwnsers);
                      //      System.out.println("display: " + test.displayValue);
                            if (test.displayValue.length() == 2) {
                            if (currentAwnsers.contains( "0")) {
                                currentAwnsers = test.displayValue;
                            }
                            else {
                                currentAwnsers += test.displayValue;
                            }
                            Firebase myFirebaseRef = new Firebase("https://percipience-ace91.firebaseio.com/");
                            myFirebaseRef.child("ID_LEERKRACHT/Appsettings/currentAnswers").setValue(currentAwnsers);
                            System.out.println(test.displayValue);

                                if (test.displayValue.contains("A")) {
                                    yesVal++;
                                    System.out.println("contains A: " + yesVal);

                                    Message msgObj = AHandler.obtainMessage();
                                    Bundle b = new Bundle();
                                    b.putString("message", Integer.toString(yesVal));
                                    msgObj.setData(b);
                                    AHandler.sendMessage(msgObj);
                                }
                                if (test.displayValue.contains("B")) {
                                    noVal++;
                                    Message msgObj = BHandler.obtainMessage();
                                    Bundle b = new Bundle();
                                    b.putString("message", Integer.toString(noVal));
                                    msgObj.setData(b);
                                    BHandler.sendMessage(msgObj);
                                }

                                if (test.displayValue.contains("C")) {
                                    CVal++;
                                    Message msgObj = BHandler.obtainMessage();
                                    Bundle b = new Bundle();
                                    b.putString("message", Integer.toString(CVal));
                                    msgObj.setData(b);
                                    CHandler.sendMessage(msgObj);
                                }

                                if (test.displayValue.contains("D")) {
                                    DVal++;
                                    Message msgObj = BHandler.obtainMessage();
                                    Bundle b = new Bundle();
                                    b.putString("message", Integer.toString(DVal));
                                    msgObj.setData(b);
                                    DHandler.sendMessage(msgObj);
                                }

                            }




                        }


                    }







                    //  finish();


            }
        });

    }



    public void scanBarcode (View v) {
        Intent intent = new Intent(this, DisplayActivity.class);
        startActivityForResult(intent, 0);
    }










      //  super.onActivityResult(requestCode,resultCode, data);

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")

    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_camera) {
            // Handle the camera action

            Intent DisplayActivity = new Intent(this, DisplayActivity.class);
            startActivity(DisplayActivity);

        } else if (id == R.id.nav_settings) {

        } else if (id == R.id.nav_login) {
        }



        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }



    private final Handler AHandler = new Handler() {

        public void handleMessage(Message msg) {
            String barRead = msg.getData().getString("message");

            if ((null != barRead)) {

                // ALERT MESSAGE

                   TextView textViewYes = (TextView) findViewById(R.id.textViewYes);
                   textViewYes.setText("Yes: " + barRead);
                Firebase myFirebaseRef = new Firebase("https://percipience-ace91.firebaseio.com/");

                myFirebaseRef.child("ID_LEERKRACHT").child("klas").child(currentKlas).child("vak").child(currentVak).child("vragen").child(currentVraag).child("resultaatA").setValue(barRead);

            }
            else
            {

                // ALERT MESSAGE
                Toast.makeText(
                        getBaseContext(),
                        "Recieved empty message when reading barcode",
                        Toast.LENGTH_SHORT).show();
            }
        }
    };
    private final Handler BHandler = new Handler() {

        public void handleMessage(Message msg) {
            String barRead = msg.getData().getString("message");

            if ((null != barRead)) {

                // ALERT MESSAGE

                TextView textViewNo = (TextView) findViewById(R.id.textViewNo);
                textViewNo.setText("No: " + barRead);
                Firebase myFirebaseRef = new Firebase("https://percipience-ace91.firebaseio.com/");

                myFirebaseRef.child("ID_LEERKRACHT").child("klas").child(currentKlas).child("vak").child(currentVak).child("vragen").child(currentVraag).child("resultaatB").setValue(barRead);

            }
            else
            {

                // ALERT MESSAGE
                Toast.makeText(
                        getBaseContext(),
                        "Recieved empty message when reading barcode",
                        Toast.LENGTH_SHORT).show();
            }
        }
    };

    private final Handler CHandler = new Handler() {

        public void handleMessage(Message msg) {
            String barRead = msg.getData().getString("message");

            if ((null != barRead)) {

                // ALERT MESSAGE

                TextView textViewC = (TextView) findViewById(R.id.textViewC);
               textViewC.setText("C: " + barRead);
                Firebase myFirebaseRef = new Firebase("https://percipience-ace91.firebaseio.com/");

                myFirebaseRef.child("ID_LEERKRACHT").child("klas").child(currentKlas).child("vak").child(currentVak).child("vragen").child(currentVraag).child("resultaatC").setValue(barRead);

            }
            else
            {

                // ALERT MESSAGE
                Toast.makeText(
                        getBaseContext(),
                        "Recieved empty message when reading barcode",
                        Toast.LENGTH_SHORT).show();
            }
        }
    };
    private final Handler DHandler = new Handler() {

        public void handleMessage(Message msg) {
            String barRead = msg.getData().getString("message");

            if ((null != barRead)) {

                // ALERT MESSAGE

                TextView textViewD = (TextView) findViewById(R.id.textViewD);
                textViewD.setText("D: " + barRead);
                Firebase myFirebaseRef = new Firebase("https://percipience-ace91.firebaseio.com/");

                myFirebaseRef.child("ID_LEERKRACHT").child("klas").child(currentKlas).child("vak").child(currentVak).child("vragen").child(currentVraag).child("resultaatD").setValue(barRead);

            }
            else
            {

                // ALERT MESSAGE
                Toast.makeText(
                        getBaseContext(),
                        "Recieved empty message when reading barcode",
                        Toast.LENGTH_SHORT).show();
            }
        }
    };


}

