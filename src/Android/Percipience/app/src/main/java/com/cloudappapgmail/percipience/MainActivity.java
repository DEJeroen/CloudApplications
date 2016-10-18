package com.cloudappapgmail.percipience;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import com.firebase.client.DataSnapshot;
import com.firebase.client.Firebase;
import com.firebase.client.FirebaseError;
import com.firebase.client.ValueEventListener;

public class MainActivity extends AppCompatActivity {

    String currentLesson;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
         Firebase.setAndroidContext(this);


        Firebase myFirebaseRef = new Firebase("https://percipience-ace91.firebaseio.com/");
        System.out.println("hey");
        myFirebaseRef.child("ID1/Lessen/GeselecteerdeLes").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                currentLesson = snapshot.getValue().toString();
                TextView textViewCurrentLesson = (TextView)findViewById(R.id.textViewCurrentLesson);
                textViewCurrentLesson.setText(currentLesson);

                System.out.println(currentLesson);  //prints "Do you have data? You'll love Firebase."
            }
            @Override public void onCancelled(FirebaseError error) { }
        });

        //

    //    myFirebaseRef.child("message").setValue("Do you have data? You'll love Firebase.");
    }



}
