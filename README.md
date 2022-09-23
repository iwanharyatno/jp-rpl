# jp-rpl
Aplikasi Kuis _Single-page_ kosakata Bahasa Jepang XII RPL SMECONE. Berdasarkan kumpulan kata-kata, frasa dan kalimat yang saya dapatkan selama belajar Bahasa Jepang di SMK Negeri 1 Purwokerto.

## Deskripsi
Aplikasi kuis ini dapat menampilkan kata, frasa maupun kalimat acak sebagai soal, dan macam-macam 'terjemahan' sebagai jawabannya. Pemain harus dapat memilih terjemahan yang paling tepat diantara 4 pilihan yang diberikan.

Setelah pemain selesai menjawab semua soal atau menekan tombol 'Berhenti' selama permainan, program akan menampilkan ringkasan soal yang sudah dijawab oleh pemain dengan menyertakan jawaban yang tepat dari soal-soal tersebut.

## Halaman awal
![Halaman awal](https://user-images.githubusercontent.com/72286584/191954503-d4004bfe-7b85-4e9f-84ec-46e3b2ce4862.png)

Terdapat 2 mode dalam aplikasi ini, diantaranya adalah menerjemahkan dari bahasa Jepang ke bahasa Indonesia dan dari bahasa Indonesia ke bahasa Jepang. Pemain dapat mengubah mode dengan menekan tombol panah (=>), dimana bagian kiri panah adalah bahasa soal (bahasa sumber) dan di bagian kanan panah adalah bahasa jawaban (bahasa target).

Selain itu pemain juga dapat mengatur batas waktu setiap soal pada input berlabel 'Interval (ms)' di bawah pilihan bahasa. Waktu yang dimasukan dalam satuan milidetik.

## Halaman permainan
![Halaman permainan](https://user-images.githubusercontent.com/72286584/191954759-f1d42490-b7d7-4905-8cfe-b69963b3e3ff.png)

Dalam satu sesi bermain, pemain hanya bisa mengerjakkan soal-soal tersebut sekali, yang artinya setelah pemain memilih salah satu dari keempat jawaban dalam suatu soal, soal tersebut akan langsung terkunci dan jawaban tersebut sudah tidak dapat diubah.

Pemain hanya bisa mengerjakkan soal berikutnya setelah waktu tunggu soal aktif sudah habis, yang artinya walaupun pemain sudah menjawab sebuah soal, program akan menunggu sampai waktu tunggu habis sebelum melanjutkan ke soal berikutnya.

Akan ada banyak soal yang akan ditampilkan pada permainan ini, pemain dapat menggunakan tombol 'Berhenti' pada pojok kiri atas halaman untik berhenti pada saat itu juga.

## Halaman ringkasan
![Halaman ringkasan](https://user-images.githubusercontent.com/72286584/191955768-e9132118-2ada-4043-8771-c4e4a921cebe.png)

Setelah permainan selesai atau diberhentikan, pemain akan diberikan ringkasan soal yang sudah dilihat oleh pemain (walaupun tidak dijawab). Dalam kotak ringkasan terdapat pertanyaan, jawaban yang benar, serta jawaban pemain. Latar belakang merah menandakan pemain salah dalam menjawab soal tersbut, dan latar belakang hijau menandakan pemain benar dalam menjawab soal tersebut.

Pemain dapat kembali ke halaman awal dengan menekan tombol 'Kembali' pada pojok kanan atas halaman dan memulai sesi permainan baru.

## Kontribusi
Segala bentuk perbaikan dalam aplikasi web ini akan sangat diapresiasi. Jangan ragu bagi anda yang ingin memperbaiki atau menutup kekurangan dari aplikasi ini.

Untuk perbaikan di bagian kesalahan penulisan atau pengejaan kata dalam soal dapat dilakukan pada [repositori sumber data](https://github.com/iwanharyatno/jp-rpl-resources).
